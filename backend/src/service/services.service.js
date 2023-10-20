import HTTP_STATUS from '../utils/http-constants.js';
import getClient from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';

const getServicesCollection = async () => {
	const connectedClient = await getClient();
	const db = connectedClient.db('ServiciosClub');
	const servicesCollection = db.collection('services');
	const usersCollection = db.collection('users');
	return {
		servicesCollection,
		usersCollection,
		connectedClient,
	};
};

class ServicesService {
	async getServices(filters) {
		const { servicesCollection, connectedClient } =
			await getServicesCollection();
		const aggregation = [
			{
				$lookup: {
					from: 'users',
					localField: 'userRef',
					foreignField: '_id',
					as: 'user_info',
				},
			},
			{
				$unwind: '$user_info',
			},
			{
				$lookup: {
					from: 'categories',
					localField: 'categoryRef',
					foreignField: '_id',
					as: 'category_info',
				},
			},
			{
				$unwind: '$category_info',
			},
			{
				$project: {
					_id: 1,
					qualification: 1,
					certified: 1,
					description: 1,
					category: 1,
					serviceImg: 1,
					serviceLocation: 1,
					active: 1,
					user: '$user_info',
					_category: '$category_info',
				},
			},
		];
		// Si hay algún filtro de búsqueda, se agrega al aggregation en el campo $match
		if (Object.keys(filters).length !== 0) {
			aggregation.unshift({
				$match: filters,
			});
		}
		const services = await servicesCollection.aggregate(aggregation).toArray();
		if (services.length === 0) {
			const customError = new Error(
				'Ningún servicio cumple el criterio de búsqueda'
			);
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return services;
	}

	async getServiceById(serviceId) {
		const { servicesCollection, connectedClient } =
			await getServicesCollection();
		const objectId = new ObjectId(serviceId);
		const service = await servicesCollection
			.aggregate([
				{
					$match: {
						_id: objectId,
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'userRef',
						foreignField: '_id',
						as: 'user_info',
					},
				},
				{
					$unwind: '$user_info',
				},
				{
					$lookup: {
						from: 'categories',
						localField: 'categoryRef',
						foreignField: '_id',
						as: 'category_info',
					},
				},
				{
					$unwind: '$category_info',
				},
				{
					$project: {
						_id: 1,
						qualification: 1,
						certified: 1,
						description: 1,
						category: 1,
						serviceImg: 1,
						serviceLocation: 1,
						user: '$user_info',
						_category: '$category_info',
					},
				},
			])
			.toArray();
		if (!service || service.length === 0) {
			const customError = new Error('Servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return service;
	}

	async createService(servicePayload) {
		const { servicesCollection, usersCollection, connectedClient } =
			await getServicesCollection();
		const {
			category,
			description,
			userId,
			certified,
			serviceLocation,
			serviceImg,
		} = servicePayload;
		if (
			!category ||
			!description ||
			!userId ||
			certified === undefined ||
			!serviceLocation
		) {
			const customError = new Error('Campos obligatorios incompletos');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const objectId = new ObjectId(userId);
		const registeredUser = await usersCollection.findOne({ _id: objectId }); //Evaluamos que el usuario que se hace profesional ya exista en la base
		if (!registeredUser) {
			const customError = new Error('No se ha encontrado al usuario');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		if (registeredUser.role === 'user') {
			//En caso de que el usuario tenga role user se lo cambiamos a pro
			await usersCollection.updateOne(
				{ _id: objectId },
				{ $set: { role: 'pro' } }
			);
		}
		const registeredService = await servicesCollection.findOne({
			userRef: objectId,
			category,
		}); //Evaluamos que el usuario no se haya registrado ya para este servicio
		if (registeredService) {
			const customError = new Error(
				'Este usuario ya se ha registrado para este servicio'
			);
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const newService = {
			//Creamos el nuevo objeto para el servicio
			category,
			description,
			userRef: objectId,
			certified,
			serviceLocation,
			serviceImg,
			active: true,
			qualification: {
				rankings: 0,
				average: 0,
			},
		};
		const createdService = await servicesCollection.insertOne(newService);
		await connectedClient.close();
		return createdService;
	}

	async updateService(serviceId, servicePayload) {
		const { servicesCollection, connectedClient } =
			await getServicesCollection();
		const {
			description,
			certified,
			serviceLocation,
			qualification,
			serviceImg,
			active,
		} = servicePayload;
		if (!serviceId || Object.keys(servicePayload).length === 0) {
			//Evaluamos que haya un id y que se mande algún dato
			const customError = new Error('Datos incompletos.');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const objectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({
			_id: objectId,
		});
		if (!service) {
			//Evaluamos que exista el profesional a modificar
			const customError = new Error('Servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		if (description) {
			service.description = description;
		}
		if (active) {
			service.active = active;
		}
		if (certified) {
			service.certified = certified;
		}
		if (serviceLocation) {
			service.serviceLocation = serviceLocation;
		}
		if (serviceImg) {
			service.serviceImg = serviceImg;
		}
		if (qualification !== undefined) {
			//Calculamos el promedio entre las calificaciones previas y la actual
			let total =
				service.qualification.rankings * service.qualification.average;
			total += qualification;
			const newAmount = (service.qualification.rankings += 1);
			service.qualification.average = Math.round(total / newAmount);
			service.qualification.rankings = newAmount;
		}
		const serviceUpdated = await servicesCollection.replaceOne(
			{ _id: objectId },
			service
		);
		await connectedClient.close();
		return serviceUpdated;
	}

	async deleteService(serviceId) {
		const { servicesCollection, connectedClient } =
			await getServicesCollection();
		const objectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({
			_id: objectId,
		});
		if (!service) {
			const customError = new Error('servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const deletedService = await servicesCollection.deleteOne({
			_id: objectId,
		});
		await connectedClient.close();
		return deletedService;
	}
}

export default ServicesService;

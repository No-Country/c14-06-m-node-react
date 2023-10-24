import HTTP_STATUS from '../utils/http-constants.js';
import getClient from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';

const getServicesCollection = async () => {
	const connectedClient = await getClient();
	const db = connectedClient.db('ServiciosClub');
	const servicesCollection = db.collection('services');
	const usersCollection = db.collection('users');
	const categoriesCollection = db.collection('categories');
	return {
		servicesCollection,
		usersCollection,
		categoriesCollection,
		connectedClient,
	};
};

class ServicesService {
	async getServices(filters) {
		const { servicesCollection, categoriesCollection, connectedClient } =
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
				$group: {
					_id: '$_id',
					description: { $first: '$description' },
					certified: { $first: '$certified' },
					serviceLocation: { $first: '$serviceLocation' },
					active: { $first: '$active' },
					qualifications: { $first: '$qualification' },
					rating: { $first: '$rating' },
					user_info: { $first: '$user_info' },
					category_info: { $first: '$category_info' },
				},
			},
			{
				$project: {
					_id: 1,
					qualifications: 1,
					rating: 1,
					certified: 1,
					description: 1,
					serviceLocation: 1,
					active: 1,
					category: {
						categoryName: '$category_info.categoryName',
						code: '$category_info.code',
					},
					user: {
						_id: '$user_info._id',
						name: '$user_info.name',
						surname: '$user_info.surname',
						email: '$user_info.email',
						phone: '$user_info.phone',
						profileImg: '$user_info.profileImg',
						location: '$user_info.location',
					},
				},
			},
		];
		// Si hay algún filtro de búsqueda, se agrega al aggregation en el campo $match
		if (Object.keys(filters).length !== 0) {
			if ('active' in filters) {
				filters.active === 'true'
					? (filters.active = true)
					: (filters.active = false);
			}
			if ('certified' in filters) {
				filters.certified === 'true'
					? (filters.certified = true)
					: (filters.certified = false);
			}
			if ('category' in filters) {
				const category = await categoriesCollection.findOne({
					code: filters.category,
				});
				const categoryObjectId = new ObjectId(category._id);
				filters.categoryRef = categoryObjectId;
				delete filters.category;
			}
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
		const aggregation = [
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
				$group: {
					_id: '$_id',
					description: { $first: '$description' },
					certified: { $first: '$certified' },
					serviceLocation: { $first: '$serviceLocation' },
					active: { $first: '$active' },
					qualifications: { $first: '$qualifications' },
					user_info: { $first: '$user_info' },
					category_info: { $first: '$category_info' },
					rating: { $first: '$rating' },
				},
			},
			{
				$project: {
					_id: 1,
					qualifications: 1,
					certified: 1,
					description: 1,
					serviceLocation: 1,
					active: 1,
					rating: 1,
					category: {
						categoryName: '$category_info.categoryName',
						code: '$category_info.code',
					},
					user: {
						_id: '$user_info._id',
						name: '$user_info.name',
						surname: '$user_info.surname',
						email: '$user_info.email',
						phone: '$user_info.phone',
						profileImg: '$user_info.profileImg',
						location: '$user_info.location',
					},
				},
			},
		];
		const services = await servicesCollection.aggregate(aggregation).toArray();
		const service = services[0];
		if (!service) {
			const customError = new Error('Servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}

		await connectedClient.close();
		return service;
	}

	async createService(servicePayload, userId) {
		const {
			servicesCollection,
			usersCollection,
			categoriesCollection,
			connectedClient,
		} = await getServicesCollection();
		const { category, description, certified, serviceLocation } =
			servicePayload;
		if (
			!category ||
			!description ||
			certified === undefined ||
			!serviceLocation ||
			!userId
		) {
			const customError = new Error('Campos obligatorios incompletos');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const registeredCategory = await categoriesCollection.findOne({
			code: category,
		});
		if (!registeredCategory) {
			const customError = new Error('No se reconoce la categoría seleccionada');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const categoryObjectId = new ObjectId(registeredCategory._id);
		const userObjectId = new ObjectId(userId);
		const registeredUser = await usersCollection.findOne({ _id: userObjectId }); //Evaluamos que el usuario que se hace profesional ya exista en la base
		if (!registeredUser) {
			const customError = new Error('No se ha encontrado al usuario');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		if (registeredUser.role === 'user') {
			//En caso de que el usuario tenga role user se lo cambiamos a pro
			await usersCollection.updateOne(
				{ _id: userObjectId },
				{ $set: { role: 'pro' } }
			);
		}
		const registeredService = await servicesCollection.findOne({
			userRef: userObjectId,
			categoryRef: categoryObjectId,
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
			userRef: userObjectId,
			categoryRef: categoryObjectId,
			description,
			certified,
			serviceLocation,
			active: true,
			qualifications: [],
			rating: 0,
		};
		const createdService = await servicesCollection.insertOne(newService);
		await usersCollection.findOneAndUpdate(
			{ _id: userObjectId },
			{ $push: { servicesRef: createdService.insertedId } }
		);
		await connectedClient.close();
		return createdService;
	}

	async qualifyService(serviceId, qualificationPayload, userId) {
		const { servicesCollection, usersCollection, connectedClient } =
			await getServicesCollection();
		const { comment, score } = qualificationPayload;
		if (!userId || !comment || score === undefined) {
			const customError = new Error('Campos obligatorios incompletos');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const userObjectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: userObjectId });
		if (!user) {
			const customError = new Error('No se encuentra al usuario');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const serviceObjectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({ _id: serviceObjectId });
		if (!service) {
			const customError = new Error('No se encuentra al servicio');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		if (JSON.stringify(service.userRef) === JSON.stringify(userObjectId)) {
			const customError = new Error('No se puede calificar un servicio propio');
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		service.qualifications.forEach((qualification) => {
			if (
				JSON.stringify(userObjectId) === JSON.stringify(qualification.userId)
			) {
				const customError = new Error(
					'No se puede calificar dos veces al mismo servicio'
				);
				customError.status = HTTP_STATUS.FORBIDDEN;
				throw customError;
			}
		});
		qualificationPayload.userId = userId;
		const ratedService = await servicesCollection.updateOne(
			{ _id: serviceObjectId },
			{ $push: { qualifications: qualificationPayload } }
		);
		const newRating =
			(service.rating * service.qualifications.length + score) /
			(service.qualifications.length + 1);
		await servicesCollection.findOneAndUpdate(
			{ _id: serviceObjectId },
			{ $set: { rating: newRating } }
		);
		await connectedClient.close();
		return ratedService;
	}

	async updateService(serviceId, servicePayload, userId) {
		const { servicesCollection, usersCollection, connectedClient } =
			await getServicesCollection();
		const { description, certified, serviceLocation, active } = servicePayload;
		if (!serviceId || Object.keys(servicePayload).length === 0) {
			const customError = new Error('Datos incompletos.');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const serviceObjectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({
			_id: serviceObjectId,
		});
		if (!service) {
			const customError = new Error('Servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const userObjectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: userObjectId });
		if (
			user?.role !== 'admin' &&
			JSON.stringify(service.userRef) !== JSON.stringify(userId)
		) {
			const customError = new Error(
				'Solo el propietario o el administrador pueden editar el servicio'
			);
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		if (description) {
			service.description = description;
		}
		if ('active' in servicePayload) {
			service.active = active;
		}
		if ('certified' in servicePayload) {
			service.certified = certified;
		}
		if (serviceLocation) {
			service.serviceLocation = serviceLocation;
		}
		const serviceUpdated = await servicesCollection.replaceOne(
			{ _id: serviceObjectId },
			service
		);
		await connectedClient.close();
		return serviceUpdated;
	}

	async deleteService(serviceId, userId) {
		const { servicesCollection, usersCollection, connectedClient } =
			await getServicesCollection();
		const serviceObjectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({
			_id: serviceObjectId,
		});
		if (!service) {
			const customError = new Error('servicio no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const userObjectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: userObjectId });
		if (
			user?.role !== 'admin' &&
			JSON.stringify(service.userRef) !== JSON.stringify(userId)
		) {
			const customError = new Error(
				'Solo el propietario o el administrador pueden borrar el servicio'
			);
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		const deletedService = await servicesCollection.deleteOne({
			_id: serviceObjectId,
		});
		await connectedClient.close();
		return deletedService;
	}
}

export default ServicesService;

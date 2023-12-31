import HTTP_STATUS from '../utils/http-constants.js';
import { connectDB } from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';
import {
	deleteFromCloudinary,
	getPublicIdFromCloudinaryUrl,
	saveToCloudinary,
} from '../utils/cloudinary.js';

const getServicesCollection = async () => {
	const db = await connectDB();
	const servicesCollection = db.collection('services');
	const usersCollection = db.collection('users');
	const categoriesCollection = db.collection('categories');
	return {
		servicesCollection,
		usersCollection,
		categoriesCollection,
	};
};

class ServicesService {
	async getServices(filters) {
		const { servicesCollection, categoriesCollection } =
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
					certificate: { $first: '$certificate' },
					serviceLocation: { $first: '$serviceLocation' },
					active: { $first: '$active' },
					qualifications: { $first: '$qualification' },
					rating: { $first: '$rating' },
					user_info: { $first: '$user_info' },
					category_info: { $first: '$category_info' },
				},
			},
			{
				$addFields: {
					profilePicNotEmpty: { $ne: ['$user_info.profileImg', ''] },
				},
			},
			{
				$project: {
					_id: 1,
					qualifications: 1,
					rating: 1,
					certified: 1,
					certificate: 1,
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
					profilePicNotEmpty: {
						$cond: {
							if: { $eq: ['$profilePicNotEmpty', false] }, // Comprueba si profilePicNotEmpty es false
							then: false, // Si es false, establece profilePicNotEmpty en false
							else: '$profilePicNotEmpty', // De lo contrario, mantiene el valor existente
						},
					},
				},
			},
			{
				$sort: {
					certified: -1,
					rating: -1,
					profilePicNotEmpty: -1,
					_id: 1,
				},
			},
		];

		// Si hay algún filtro de búsqueda, se agrega al aggregation en el campo $match
		const matchStage = {
			$match: {},
		};
		if (Object.keys(filters).length !== 0) {
			matchStage.$match = filters;
			if ('active' in filters) {
				filters.active === 'true'
					? (matchStage.$match.active = true)
					: (filters.active = false);
			}
			if ('certified' in filters) {
				filters.certified === 'true'
					? (matchStage.$match.certified = true)
					: (matchStage.$match.certified = false);
			}
			if ('category' in filters) {
				const category = await categoriesCollection.findOne({
					code: filters.category,
				});
				const categoryObjectId = new ObjectId(category._id);
				matchStage.$match.categoryRef = categoryObjectId;
				delete matchStage.$match.category;
			}
			if ('location' in filters) {
				matchStage.$match['user_info.location'] = filters.location;
				delete matchStage.$match.location;
			}
			aggregation.splice(2, 0, matchStage);
		}

		const services = await servicesCollection.aggregate(aggregation).toArray();
		if (services.length === 0) {
			const customError = new Error(
				'Ningún servicio cumple el criterio de búsqueda'
			);
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		return services;
	}

	async getServiceById(serviceId) {
		const { servicesCollection, usersCollection } =
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
				$lookup: {
					from: 'qualifications',
					localField: 'qualifications',
					foreignField: '_id',
					as: 'qualification_info',
				},
			},
			{
				$unwind: {
					path: '$qualification_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$group: {
					_id: '$_id',
					description: { $first: '$description' },
					certified: { $first: '$certified' },
					certificate: { $first: '$certificate' },
					serviceLocation: { $first: '$serviceLocation' },
					active: { $first: '$active' },
					qualifications: { $push: '$qualification_info' },
					user_info: { $first: '$user_info' },
					category_info: { $first: '$category_info' },
					rating: { $first: '$rating' },
				},
			},
			{
				$project: {
					_id: 1,
					certified: 1,
					certificate: 1,
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
					qualifications: {
						$map: {
							input: '$qualifications',
							as: 'qualification',
							in: {
								_id: '$$qualification._id',
								score: '$$qualification.score',
								comment: '$$qualification.comment',
								userRef: '$$qualification.userRef',
								date: '$$qualification.date',
							},
						},
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
		const populatedQualifications = [];
		for (let i = 0; i < service.qualifications?.length; i++) {
			const userObjectId = new ObjectId(service.qualifications[i].userRef);
			const user = await usersCollection.findOne({ _id: userObjectId });
			if (user) {
				const newQualification = service.qualifications[i];
				newQualification.user = {
					name: user.name,
					surname: user.surname,
					email: user.email,
					profileImg: user.profileImg,
				};
				populatedQualifications.push(newQualification);
			}
		}
		const sortedQualifications = populatedQualifications.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateB - dateA;
		});
		service.qualifications = [...sortedQualifications];
		return service;
	}

	async createService(servicePayload, userId) {
		const { servicesCollection, usersCollection, categoriesCollection } =
			await getServicesCollection();
		const { category, description, serviceLocation } = servicePayload;
		if (!category || !description || !serviceLocation || !userId) {
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
			certified: false,
			certificate: '',
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
		return createdService;
	}

	async qualifyService(serviceId, qualification) {
		const { servicesCollection } = await getServicesCollection();
		const serviceObjectId = new ObjectId(serviceId);
		const service = await servicesCollection.findOne({ _id: serviceObjectId });
		if (!service) {
			const customError = new Error('No se encuentra al servicio');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const ratedService = await servicesCollection.updateOne(
			{ _id: serviceObjectId },
			{ $push: { qualifications: qualification._id } }
		);
		const newRating =
			(service.rating * service.qualifications.length + qualification.score) /
			(service.qualifications.length + 1);
		const fixedRating = +newRating.toFixed(2);
		await servicesCollection.findOneAndUpdate(
			{ _id: serviceObjectId },
			{ $set: { rating: fixedRating } }
		);
		return ratedService;
	}

	async removeQualification(qualification) {
		const { servicesCollection } = await getServicesCollection();
		const serviceObjectId = new ObjectId(qualification.serviceRef);
		const service = await servicesCollection.findOne({ _id: serviceObjectId });
		if (!service) {
			const customError = new Error('No se encuentra al servicio');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const newRating =
			(service.rating * service.qualifications.length - qualification.score) /
			(service.qualifications.length - 1);
		const fixedRating = +newRating.toFixed(2);
		servicesCollection.updateOne(
			{ _id: serviceObjectId },
			{
				$pull: { qualifications: qualification._id },
				$set: { rating: fixedRating },
			}
		);
	}

	async updateService(serviceId, servicePayload, userId) {
		const { servicesCollection, usersCollection } =
			await getServicesCollection();
		const {
			description,
			certificate = null,
			serviceLocation,
			active,
		} = servicePayload;

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
		if (certificate !== null) {
			try {
				const oldCertificate = service.certificate || '';
				if (oldCertificate.startsWith('https://')) {
					await deleteFromCloudinary(
						getPublicIdFromCloudinaryUrl(oldCertificate)
					);
				}

				const { secureUrl } = await saveToCloudinary(certificate);
				service.certificate = secureUrl;
				service.certified = true;
			} catch (error) {
				throw new Error('Ocurrió un error al intentar subir la imágen');
			}
		}
		if (serviceLocation) {
			service.serviceLocation = serviceLocation;
		}
		const serviceUpdated = await servicesCollection.replaceOne(
			{ _id: serviceObjectId },
			service
		);
		return serviceUpdated;
	}

	async deleteService(serviceId, userId) {
		const { servicesCollection, usersCollection } =
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

		if (service.certificate?.startsWith('https://')) {
			await deleteFromCloudinary(
				getPublicIdFromCloudinaryUrl(service.certificate)
			);
		}

		const deletedService = await servicesCollection.deleteOne({
			_id: serviceObjectId,
		});
		return deletedService;
	}
}

export default ServicesService;

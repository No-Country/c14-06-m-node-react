import HTTP_STATUS from '../utils/http-constants.js';
import '../database/mongo-client.js';
import getClient from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';

const getProfessionalsCollection = async () => {
	const connectedClient = await getClient();
	const db = connectedClient.db('ServiciosClub');
	return {
		db,
		connectedClient,
	};
};

class ProfessionalsService {
	async getProfessionals(service) {
		const { db, connectedClient } = await getProfessionalsCollection();
		const professionalsCollection = db.collection(service);
		const professionals = await professionalsCollection
			.aggregate([
				{
					$lookup: {
						from: 'Users', // Nombre de la colección de usuarios
						localField: 'user', // Campo en la colección de plomeros que hace referencia al ID del usuario
						foreignField: '_id', // Campo en la colección de usuarios que se utiliza para la relación
						as: 'user_info', // Nombre del nuevo campo que contendrá la información del usuario
					},
				},
				{
					$unwind: '$user_info',
				},
				{
					$project: {
						_id: 1,
						qualification: 1, // Otros campos de la colección de plomeros que desees incluir
						certified: 1,
						description: 1,
						user: '$user_info', // Campo que contiene la información completa del usuario
					},
				},
			])
			.toArray();
		if (professionals.length === 0) {
			const customError = new Error(
				'Ningún profesional cumple el criterio de búsqueda'
			);
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return professionals;
	}

	async getProfessionalById(service, professionalId) {
		const { db, connectedClient } = await getProfessionalsCollection();
		const professionalsCollection = db.collection(service);
		const objectId = new ObjectId(professionalId);
		const professional = await professionalsCollection
			.aggregate([
				{
					$match: {
						_id: objectId,
					},
				},
				{
					$lookup: {
						from: 'Users', // Nombre de la colección de usuarios
						localField: 'user', // Campo en la colección de plomeros que hace referencia al ID del usuario
						foreignField: '_id', // Campo en la colección de usuarios que se utiliza para la relación
						as: 'user_info', // Nombre del nuevo campo que contendrá la información del usuario
					},
				},
				{
					$unwind: '$user_info',
				},
				{
					$project: {
						_id: 1,
						qualification: 1, // Otros campos de la colección de plomeros que desees incluir
						certified: 1,
						description: 1,
						user: '$user_info', // Campo que contiene la información completa del usuario
					},
				},
			])
			.toArray();
		if (!professional || professional.length === 0) {
			const customError = new Error('Profesional no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return professional;
	}

	async createProfessional(profesionalPayload) {
		const { service, description, userId, certified } = profesionalPayload;
		if (!service || !description || !userId || certified === undefined) {
			//Evaluamos que estén todos los campos requeridos
			const customError = new Error('Campos incompletos');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const { db, connectedClient } = await getProfessionalsCollection();
		const professionalsCollection = db.collection(service);
		const usersCollection = db.collection('Users');
		const objectId = new ObjectId(userId);
		const registeredUser = await usersCollection.findOne({ _id: objectId }); //Evaluamos que el usuario que se hace profesional ya exista en la base
		if (!registeredUser) {
			const customError = new Error('No se ha encontrado al usuario');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const registeredProfessional = await professionalsCollection.findOne({
			user: objectId,
		}); //Evaluamos que el usuario no se haya registrado ya para este servicio
		if (registeredProfessional) {
			const customError = new Error(
				'Este usuario ya se ha registrado para este servicio'
			);
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const newProfessional = {
			//Creamos el nuevo objeto para el profesional
			description,
			user: objectId,
			certified,
			qualification: {
				rankings: 0,
				average: 0,
			},
		};
		const createdUser =
			await professionalsCollection.insertOne(newProfessional);
		await connectedClient.close();
		return createdUser;
	}

	// async updateUser(userId, userPayload) {
	// 	const { usersCollection, connectedClient } = await getUsersCollection();
	// 	const objectId = new ObjectId(userId);
	// 	const user = await usersCollection.findOne({ _id: objectId });
	// 	if (!user) {
	// 		const customError = new Error('Usuario no encontrado');
	// 		customError.status = HTTP_STATUS.NOT_FOUND;
	// 		throw customError;
	// 	}
	// 	const userUpdated = await usersCollection.replaceOne(
	// 		{ _id: objectId },
	// 		userPayload
	// 	);
	// 	await connectedClient.close();
	// 	return userUpdated;
	// }

	async deleteProfessional(professionalId, service) {
		const { db, connectedClient } = await getProfessionalsCollection();
		const professionalsCollection = db.collection(service);
		const objectId = new ObjectId(professionalId);
		const professional = await professionalsCollection.findOne({
			_id: objectId,
		});
		if (!professional) {
			const customError = new Error('Profesional no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const deletedProfessional = await professionalsCollection.deleteOne({
			_id: objectId,
		});
		await connectedClient.close();
		return deletedProfessional;
	}
}

export default ProfessionalsService;

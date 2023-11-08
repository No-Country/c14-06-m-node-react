import HTTP_STATUS from '../utils/http-constants.js';
import '../database/mongo-client.js';
import { connectDB } from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';

const getQualificationsCollection = async () => {
	const db = await connectDB();
	const qualificationsCollection = db.collection('qualifications');
	const usersCollection = db.collection('users');
	const servicesCollection = db.collection('services');
	return {
		qualificationsCollection,
		usersCollection,
		servicesCollection,
	};
};

class QualificationsService {
	async getQualificationById(qId) {
		const { qualificationsCollection } = await getQualificationsCollection();
		const qualificationObjectId = new ObjectId(qId);
		const qualification = await qualificationsCollection.findOne({
			_id: qualificationObjectId,
		});
		if (!qualification) {
			const customError = new Error('Calificación no encontrada');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		return qualification;
	}

	async createQualification(userIdToken, serviceId, qualificationPayload) {
		const { qualificationsCollection, usersCollection, servicesCollection } =
			await getQualificationsCollection();
		const { comment, score } = qualificationPayload;
		if (!comment || score === undefined) {
			const customError = new Error('Campos obligatorios incompletos');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		if (!userIdToken) {
			const customError = new Error('Falta el id del usuario');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const userObjectId = new ObjectId(userIdToken);
		const user = await usersCollection.findOne({ _id: userObjectId });
		if (!user) {
			const customError = new Error('No se encuentra al usuario');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		if (!serviceId) {
			const customError = new Error('Falta el id del servicio');
			customError.status = HTTP_STATUS.BAD_REQUEST;
			throw customError;
		}
		const serviceObjectId = new ObjectId(serviceId);
		const services = await servicesCollection
			.aggregate([
				{
					$match: {
						_id: serviceObjectId,
					},
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
						qualifications: { $push: '$qualification_info' },
					},
				},
				{
					$project: {
						_id: 1,
						qualifications: {
							$map: {
								input: '$qualifications',
								as: 'qualification',
								in: {
									_id: '$$qualification._id',
									userRef: '$$qualification.userRef',
								},
							},
						},
					},
				},
			])
			.toArray();
		const service = services[0];
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
		const registeredCategories = [];
		if (user.servicesRef) {
			for (const serviceRef of user.servicesRef) {
				const userService = await servicesCollection.findOne({
					_id: serviceRef,
				});
				let stringId = JSON.stringify(userService?.categoryRef);
				registeredCategories.push(stringId);
			}
			if (registeredCategories.includes(JSON.stringify(service.categoryRef))) {
				const customError = new Error(
					'No se puede calificar servicios de la misma categoría que son ofrecidos por el usuario'
				);
				customError.status = HTTP_STATUS.FORBIDDEN;
				throw customError;
			}
		}
		service.qualifications?.forEach((qualification) => {
			if (
				JSON.stringify(userObjectId) === JSON.stringify(qualification.userRef)
			) {
				const customError = new Error(
					'No se puede calificar dos veces al mismo servicio'
				);
				customError.status = HTTP_STATUS.FORBIDDEN;
				throw customError;
			}
		});
		qualificationPayload.userRef = userObjectId;
		qualificationPayload.serviceRef = serviceObjectId;
		qualificationPayload.date = new Date();
		const createdQualification =
			await qualificationsCollection.insertOne(qualificationPayload);
		const newQualification = {
			_id: createdQualification.insertedId,
			score,
		};
		return newQualification;
	}

	async deleteQualificationById(qualificationId) {
		const { qualificationsCollection } = await getQualificationsCollection();
		const qualificationObjectId = new ObjectId(qualificationId);
		const deletedQualification = qualificationsCollection.deleteOne({
			_id: qualificationObjectId,
		});
		return deletedQualification;
	}

	async deleteQualificationByUser(userId) {
		const { qualificationsCollection } = await getQualificationsCollection();
		const userObjectId = new ObjectId(userId);
		const qualificationsToDelete = await qualificationsCollection
			.find({ userRef: userObjectId })
			.toArray();
		qualificationsToDelete.forEach(async (qualification) => {
			await qualificationsCollection.deleteOne({ _id: qualification._id });
		});
		return qualificationsToDelete;
	}
}

export default QualificationsService;

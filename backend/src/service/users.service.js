import HTTP_STATUS from '../utils/http-constants.js';
import '../database/mongo-client.js';
import { connectDB } from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';
import {
	deleteFromCloudinary,
	getPublicIdFromCloudinaryUrl,
	saveToCloudinary,
} from '../utils/cloudinary.js';

const getUsersCollection = async () => {
	const db = await connectDB();
	const usersCollection = db.collection('users');
	const categoriesCollection = db.collection('categories');
	return {
		usersCollection,
		categoriesCollection,
	};
};

class UsersService {
	// async getUsers(filters) {
	// 	const { usersCollection, connectedClient } = await getUsersCollection();
	// 	const aggregation = [
	// 		{
	// 			$lookup: {
	// 				from: 'services',
	// 				localField: 'servicesRef',
	// 				foreignField: '_id',
	// 				as: 'service_info',
	// 			},
	// 		},
	// 		{
	// 			$unwind: {
	// 				path: '$service_info',
	// 				preserveNullAndEmptyArrays: true,
	// 			},
	// 		},
	// 		{
	// 			$group: {
	// 				_id: '$_id',
	// 				name: { $first: '$name' },
	// 				surname: { $first: '$surname' },
	// 				email: { $first: '$email' },
	// 				phone: { $first: '$phone' },
	// 				location: { $first: '$location' },
	// 				role: { $first: '$role' },
	// 				profileImg: { $first: '$profileImg' },
	// 				servicesRef: { $push: '$service_info' },
	// 			},
	// 		},
	// 		{
	// 			$project: {
	// 				_id: 1,
	// 				name: 1,
	// 				surname: 1,
	// 				email: 1,
	// 				phone: 1,
	// 				location: 1,
	// 				role: 1,
	// 				profileImg: 1,
	// 				services: {
	// 					$map: {
	// 						input: '$servicesRef',
	// 						as: 'service',
	// 						in: {
	// 							_id: '$$service._id',
	// 							categoryRef: '$$service.categoryRef',
	// 							description: '$$service.description',
	// 							certified: '$$service.certified',
	// 							serviceLocation: '$$service.serviceLocation',
	// 							active: '$$service.active',
	// 							qualifications: '$$service.qualifications',
	// 							rating: '$$service.rating',
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	];
	// 	if (Object.keys(filters).length !== 0) {
	// 		aggregation.unshift({
	// 			$match: filters,
	// 		});
	// 	}
	// 	const users = await usersCollection.aggregate(aggregation).toArray();
	// 	await connectedClient.close();
	// 	return users;
	// }

	async getCurrentbyToken(userId) {
		const { usersCollection } = await getUsersCollection();
		const tokenObjectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: tokenObjectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		delete user.password;
		return user;
	}

	async getUserById(userId, userIdToken) {
		const { usersCollection, categoriesCollection } =
			await getUsersCollection();
		const userObjectId = new ObjectId(userId);
		const tokenObjectId = new ObjectId(userIdToken);
		const aggregation = [
			{
				$match: {
					_id: userObjectId,
				},
			},
			{
				$lookup: {
					from: 'services',
					localField: 'servicesRef',
					foreignField: '_id',
					as: 'service_info',
				},
			},
			{
				$unwind: {
					path: '$service_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$group: {
					_id: '$_id',
					name: { $first: '$name' },
					surname: { $first: '$surname' },
					email: { $first: '$email' },
					phone: { $first: '$phone' },
					location: { $first: '$location' },
					role: { $first: '$role' },
					profileImg: { $first: '$profileImg' },
					servicesRef: { $push: '$service_info' },
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					surname: 1,
					email: 1,
					phone: 1,
					location: 1,
					role: 1,
					profileImg: 1,
					services: {
						$map: {
							input: '$servicesRef',
							as: 'service',
							in: {
								_id: '$$service._id',
								categoryRef: '$$service.categoryRef',
								description: '$$service.description',
								certified: '$$service.certified',
								serviceLocation: '$$service.serviceLocation',
								active: '$$service.active',
								qualifications: '$$service.qualifications',
								rating: '$$service.rating',
							},
						},
					},
				},
			},
		];
		const users = await usersCollection.aggregate(aggregation).toArray();
		const user = users[0];
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		for (const service of user.services) {
			const category = await categoriesCollection.findOne({
				_id: service.categoryRef,
			});
			delete category._id;
			service.category = category;
			delete service.categoryRef;
		}
		const tokenUser = await usersCollection.findOne({ _id: tokenObjectId });
		if (userId !== userIdToken && tokenUser.role !== 'admin') {
			const customError = new Error('No se tiene acceso a este perfil');
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		return user;
	}

	async getUserByEmail(userEmail) {
		const { usersCollection } = await getUsersCollection();
		const user = await usersCollection.findOne({ email: userEmail });
		return user;
	}

	async createUser(userPayload) {
		const { usersCollection } = await getUsersCollection();
		userPayload.servicesRef = [];
		userPayload.profileImg = '';
		const createdUser = await usersCollection.insertOne(userPayload);
		return createdUser;
	}

	async updateUser(userId, userPayload, userIdToken) {
		const { usersCollection } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const tokenObjectId = new ObjectId(userIdToken);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const tokenUser = await usersCollection.findOne({ _id: tokenObjectId });
		if (userId !== userIdToken && tokenUser.role !== 'admin') {
			const customError = new Error('No se tiene acceso a este perfil');
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		const filter = { _id: objectId };
		const updateDocument = {
			$set: userPayload,
		};
		const userUpdated = await usersCollection.updateOne(filter, updateDocument);
		return userUpdated;
	}

	async updateImage(userId, userIdToken, imagePath) {
		const { usersCollection } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const tokenObjectId = new ObjectId(userIdToken);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const tokenUser = await usersCollection.findOne({ _id: tokenObjectId });
		if (userId !== userIdToken && tokenUser.role !== 'admin') {
			const customError = new Error('No se tiene acceso a este perfil');
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		const filter = { _id: objectId };

		try {
			if (
				user.profileImg !== undefined &&
				user.profileImg.startsWith('https://')
			) {
				await deleteUserImageFromCloudinary(user.profileImg);
			}
			const { secureUrl } = await saveToCloudinary(imagePath);
			const updateDocument = {
				$set: { profileImg: secureUrl },
			};
			const userUpdated = await usersCollection.updateOne(
				filter,
				updateDocument
			);
			return userUpdated;
		} catch (error) {
			throw new Error('Ocurrió un error al intentar subir la imágen');
		}
	}

	async deleteUser(userId, userIdToken) {
		const { usersCollection } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const tokenObjectId = new ObjectId(userIdToken);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const tokenUser = await usersCollection.findOne({ _id: tokenObjectId });
		if (userId !== userIdToken && tokenUser.role !== 'admin') {
			const customError = new Error('No se tiene acceso a este perfil');
			customError.status = HTTP_STATUS.FORBIDDEN;
			throw customError;
		}
		await deleteUserImageFromCloudinary(user.profileImg);
		const deletedUser = await usersCollection.deleteOne({ _id: objectId });
		return deletedUser;
	}
}

async function deleteUserImageFromCloudinary(userImage) {
	const publicId = getPublicIdFromCloudinaryUrl(userImage);
	await deleteFromCloudinary(publicId);
}

export default UsersService;

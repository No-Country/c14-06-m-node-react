import HTTP_STATUS from '../utils/http-constants.js';
import '../database/mongo-client.js';
import getClient from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';

const getUsersCollection = async () => {
	const connectedClient = await getClient();
	const db = connectedClient.db('ServiciosClub');
	const usersCollection = db.collection('users');
	return {
		usersCollection,
		connectedClient,
	};
};

class UsersService {
	async getUsers(filters) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const aggregation = [
			{
				$lookup: {
					from: 'services',
					localField: 'servicesRef',
					foreignField: '_id',
					as: 'service_info',
				},
			},
			{
				$unwind: '$service_info',
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
					services: { $push: '$service_info' },
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
							input: '$services',
							as: 'service',
							in: {
								_id: '$$service._id',
								categoryRef: '$$service.categoryRef',
								description: '$$service.description',
								certified: '$$service.certified',
								serviceLocation: '$$service.serviceLocation',
								active: '$$service.active',
								qualification: '$$service.qualification',
							},
						},
					},
				},
			},
		];
		if (Object.keys(filters).length !== 0) {
			aggregation.unshift({
				$match: filters,
			});
		}
		const users = await usersCollection.aggregate(aggregation).toArray();
		await connectedClient.close();
		return users;
	}

	async getUserById(userId) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const userObjectId = new ObjectId(userId);
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
				$unwind: '$service_info',
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
					services: { $push: '$service_info' },
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
							input: '$services',
							as: 'service',
							in: {
								_id: '$$service._id',
								categoryRef: '$$service.categoryRef',
								description: '$$service.description',
								certified: '$$service.certified',
								serviceLocation: '$$service.serviceLocation',
								active: '$$service.active',
								qualification: '$$service.qualification',
							},
						},
					},
				},
			},
		];
		const user = await usersCollection.aggregate(aggregation).toArray();
		if (user.length === 0) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return user[0];
	}

	async getUserByEmail(userEmail) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const user = await usersCollection.findOne({ email: userEmail });
		await connectedClient.close();
		return user;
	}

	async createUser(userPayload) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		userPayload.servicesRef = [];
		const createdUser = await usersCollection.insertOne(userPayload);
		await connectedClient.close();
		return createdUser;
	}

	async updateUser(userId, userPayload) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const filter = { _id: objectId };
		const updateDocument = {
			$set: userPayload,
		};
		const userUpdated = await usersCollection.updateOne(filter, updateDocument);
		await connectedClient.close();
		return userUpdated;
	}

	async deleteUser(userId) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		const deletedUser = await usersCollection.deleteOne({ _id: objectId });
		await connectedClient.close();
		return deletedUser;
	}
}

export default UsersService;

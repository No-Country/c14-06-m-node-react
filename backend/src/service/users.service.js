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
	async getUsers() {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const users = await usersCollection.find({}).toArray();
		await connectedClient.close();
		return users;
	}

	async getUserById(userId) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		await connectedClient.close();
		return user;
	}

	async getUserByEmail(userEmail) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const user = await usersCollection.findOne({ email: userEmail });
		await connectedClient.close();
		return user;
	}

	async createUser(userPayload) {
		const { usersCollection, connectedClient } = await getUsersCollection();
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
		const userUpdated = await usersCollection.replaceOne(
			{ _id: objectId },
			userPayload
		);
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

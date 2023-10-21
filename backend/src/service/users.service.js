import HTTP_STATUS from '../utils/http-constants.js';
import '../database/mongo-client.js';
import getClient from '../database/mongo-client.js';
import { ObjectId } from 'mongodb';
import {
	deleteFromCloudinary,
	getPublicIdFromCloudinaryUrl,
	saveToCloudinary,
} from '../utils/cloudinary.js';

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
		const users = await usersCollection.find(filters).toArray();
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
		const filter = { _id: objectId };
		const updateDocument = {
			$set: userPayload,
		};
		const userUpdated = await usersCollection.updateOne(filter, updateDocument);
		await connectedClient.close();
		return userUpdated;
	}

	async updateImage(userId, imagePath) {
		const { usersCollection, connectedClient } = await getUsersCollection();
		const objectId = new ObjectId(userId);
		const user = await usersCollection.findOne({ _id: objectId });
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
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
			await connectedClient.close();
			return userUpdated;
		} catch (error) {
			await connectedClient.close();
			console.log(error);
			throw new Error('Ocurrió un error al intentar subir la imágen');
		}
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

		await deleteUserImageFromCloudinary(user.profileImg);
		const deletedUser = await usersCollection.deleteOne({ _id: objectId });
		await connectedClient.close();
		return deletedUser;
	}
}

async function deleteUserImageFromCloudinary(userImage) {
	const publicId = getPublicIdFromCloudinaryUrl(userImage);
	await deleteFromCloudinary(publicId);
}

export default UsersService;

import { v4 as uuidv4 } from 'uuid';
import userList from '../mock/users.mock.js';
import HTTP_STATUS from '../utils/http-constants.js';

const users = userList;

class UsersService {
	async getUsers() {
		//Validaciones y llamada a la bbdd
		return users;
	}

	async getUserById(userId) {
		const user = users.find((item) => item.Id === userId);
		if (!user) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		return user;
	}

	async createUser(userPayload) {
		userPayload.Id = uuidv4();
		users.push(userPayload);
		return users;
	}

	async updateUser(userId, userPayload) {
		const userIndex = users.findIndex((user) => user.Id === userId);
		if (userIndex === -1) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		users.splice(userIndex, 1, userPayload);
		return userPayload;
	}

	async deleteUser(userId) {
		const userIndex = users.findIndex((item) => item.Id === userId);
		if (userIndex === -1) {
			const customError = new Error('Usuario no encontrado');
			customError.status = HTTP_STATUS.NOT_FOUND;
			throw customError;
		}
		users.splice(userIndex, 1);
		return users;
	}
}

export default UsersService;

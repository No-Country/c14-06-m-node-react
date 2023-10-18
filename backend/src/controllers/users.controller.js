import UsersService from '../service/users.service.js';
import HTTP_STATUS from '../utils/http-constants.js';
import { validatePhoneNumber } from '../utils/validate-phone.js';

const usersService = new UsersService();

class UsersController {
	static async getAll(req, res, next) {
		const filters = req.query;
		try {
			const users = await usersService.getUsers(filters);
			res.status(200).json({
				status: 'success',
				response: users,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { userId } = req.params;
		try {
			const user = await usersService.getUserById(userId);
			res.status(200).json({
				status: 'success',
				response: user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addOne(req, res, next) {
		const userPayload = req.body;
		try {
			validateUserPhone(userPayload);

			const createUser = await usersService.createUser(userPayload);
			res.status(201).json({
				status: 'created',
				response: createUser,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		const { userId } = req.params;
		const userPayload = req.body;
		try {
			if (userPayload.phone !== undefined) validateUserPhone(userPayload);

			const updatedUser = await usersService.updateUser(userId, userPayload);
			res.status(200).json({
				status: 'success',
				response: updatedUser,
			});
		} catch (error) {
			next(error);
		}
	}

	static async remove(req, res, next) {
		const { userId } = req.params;
		try {
			const deletedUser = await usersService.deleteUser(userId);
			res.status(200).json({
				status: 'success',
				response: deletedUser,
			});
		} catch (error) {
			next(error);
		}
	}
}

const validateUserPhone = (user) => {
	const { countryName, validPhone } = validatePhoneNumber(user.phone);
	if (!validPhone) {
		const customError = new Error(
			`Número de teléfono de ${countryName} inválido`
		);
		customError.status = HTTP_STATUS.BAD_REQUEST;
		throw customError;
	}
};

export default UsersController;

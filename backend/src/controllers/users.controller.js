import UsersService from '../service/users.service.js';

const usersService = new UsersService();

class UsersController {
	static async getAll(req, res, next) {
		try {
			const users = await usersService.getUsers();
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

export default UsersController;

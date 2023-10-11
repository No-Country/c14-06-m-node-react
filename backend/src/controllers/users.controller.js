import userList from '../mock/users.mock.js';

const users = userList;

class UsersController {
	static async getAll(req, res, next) {
		try {
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
			const user = users.find((item) => item.Id === userId);
			res.status(200).json({
				status: 'success',
				response: user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addOne(req, res, next) {
		const user = req.body;
		try {
			users.push(user);
			res.status(201).json({
				status: 'created',
				response: users,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		const { userId } = req.params;
		const payload = req.body;
		try {
			const userIndex = users.findIndex((user) => user.Id === userId);
			if (userIndex === -1) {
				return next({
					status: 404,
					error: 'User not found',
				});
			}
			users.splice(userIndex, 1, payload);
			res.status(200).json({
				status: 'success',
				response: 'User updated',
			});
		} catch (error) {
			next(error);
		}
	}

	static async remove(req, res, next) {
		const { userId } = req.params;
		try {
			const userIndex = users.findIndex((item) => item.Id === userId);
			if (userIndex === -1) {
				return next({
					status: 404,
					error: 'User not found',
				});
			}
			users.splice(userIndex, 1);
			res.status(200).json({
				status: 'success',
				response: 'User deleted',
			});
		} catch (error) {
			next(error);
		}
	}
}

export default UsersController;

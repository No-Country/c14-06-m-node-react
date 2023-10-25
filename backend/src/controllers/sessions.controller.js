import UsersService from '../service/users.service.js';
import { generateToken } from '../utils/session.utils.js';

const usersService = new UsersService();

class SessionsController {
	static async login(req, res, next) {
		const { user } = req;
		try {
			if (!user) {
				next({
					status: 'Bad request',
					message: 'No se encuentran las credenciales del usuario',
				});
			}
			const access_token = generateToken(user);
			const response = {
				token: `Bearer ${access_token}`,
				user,
			};
			res.status(200).json({
				status: 'success',
				response,
			});
		} catch (error) {
			next(error);
		}
	}

	static async currentSession(req, res, next) {
		const { _id } = req.user;
		try {
			const user = await usersService.getCurrentbyToken(_id);
			res.status(200).json({
				status: 'success',
				response: user,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default SessionsController;

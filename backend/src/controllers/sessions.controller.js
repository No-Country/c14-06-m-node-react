import { generateToken } from '../utils/session.utils.js';
import envs from '../config/env.config.js';

class SessionsController {
	static async login(req, res, next) {
		const { user } = req;
		try {
			if (!user) {
				next({
					status: 'bad request',
					message: 'no se encuentran las credenciales del usuario',
				});
			}
			const access_token = generateToken(user);
			res.cookie(envs.SESSION_KEY, access_token, {
				maxAge: 60 * 60 * 2 * 1000,
				httpOnly: true,
			});
			res.status(201).json({
				status: 'created',
				response: 'Inicio de sesión exitoso',
			});
		} catch (error) {
			next(error);
		}
	}

	static async logout(req, res, next) {
		try {
			res.clearCookie(envs.SESSION_KEY);
			console.log('user logged out');
			res.status(200).json({
				status: 'success',
				response: 'Fin de la sesión',
			});
		} catch (error) {
			next(error);
		}
	}

	static async currentSession(req, res) {
		return res.json(req.user);
	}
}

export default SessionsController;

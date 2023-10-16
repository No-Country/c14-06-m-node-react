import { generateToken } from '../utils/session.utils.js';

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
			res.status(201).json({
				status: 'created',
				response: 'Inicio de sesión exitoso',
				token: 'Bearer ' + access_token,
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

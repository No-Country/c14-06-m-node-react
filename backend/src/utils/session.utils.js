import jwt from 'jsonwebtoken';
import envs from '../config/env.config.js';

export const generateToken = (payload) => {
	const token = jwt.sign(payload, envs.SECRET_KEY, { expiresIn: '2h' });
	return token;
};

export const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies[envs.SESSION_KEY];
	}
	return token;
};

export const generateRecoveringToken = (email) => {
	const token = jwt.sign({ email }, envs.SECRET_KEY, { expiresIn: '1h' });
	return token;
};

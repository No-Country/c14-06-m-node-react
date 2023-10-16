import jwt from 'jsonwebtoken';
import envs from '../config/env.config.js';

export const generateToken = (payload) => {
	const token = jwt.sign(payload, envs.SECRET_KEY, { expiresIn: '2h' });
	return token;
};

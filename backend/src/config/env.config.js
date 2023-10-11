import dotenv from 'dotenv';

dotenv.config();

export default {
	MONGODB_USER: process.env.MONGODB_USER,
	MONGODB_PASS: process.env.MONGODB_PASS,
};

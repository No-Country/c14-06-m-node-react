import dotenv from 'dotenv';

dotenv.config();

export default {
	PORT: process.env.PORT || 3001,
	MONGO_URI: process.env.MONGO_URI,
	SECRET_KEY: process.env.SECRET_KEY,
	SESSION_KEY: process.env.SESSION_KEY,
	GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
	GMAIL_PASS: process.env.GMAIL_PASS,
	CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

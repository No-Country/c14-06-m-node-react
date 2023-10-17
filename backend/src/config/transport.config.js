import nodemailer from 'nodemailer';
import envs from './env.config.js';

const gmailTransport = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: envs.GMAIL_ACCOUNT,
		pass: envs.GMAIL_PASS,
	},
});

export default gmailTransport;

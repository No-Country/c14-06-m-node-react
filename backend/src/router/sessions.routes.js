import { Router } from 'express';
import passport from 'passport';
import SessionsController from '../controllers/sessions.controller.js';
import gmailTransport from '../config/transport.config.js';
import envs from '../config/env.config.js';

const router = Router();

router.post(
	'/register',
	passport.authenticate('register', { failureRedirect: 'failregister' }),
	async (req, res) => {
		const { email, name } = req.body;
		await gmailTransport.sendMail({
			from: `Servicios Club <${envs.GMAIL_ACCOUNT}>`,
			to: email,
			subject: 'Nueva cuenta de ServiciosClub',
			html: `
            <div>
                <h1>Bienvenido a ServiciosClub!</h1>
                <p>${name}, ya puedes navegar en nuestro sitio para encontrar u ofrecer los mejores servicios para el hogar</p>
				<a href="https://serviciosclub.com">Ir al sitio</a> 
            </div>`,
			attachments: [],
		});
		res.status(201).json({
			status: 'created',
			response: req.user,
		});
	}
);

router.get('/failregister', (req, res, next) => {
	next({ status: 401, message: 'Error de registro' });
});

router.post(
	'/login',
	passport.authenticate('login', { failureRedirect: 'faillogin' }),
	SessionsController.login
);

router.get('/faillogin', (req, res, next) => {
	next({ status: 401, message: 'Error de inicio de sesión' });
});

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	SessionsController.currentSession
);

export default router;

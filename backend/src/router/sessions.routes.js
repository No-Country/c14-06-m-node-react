import { Router } from 'express';
import passport from 'passport';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post(
	'/register',
	passport.authenticate('register', { failureRedirect: 'failregister' }),
	async (req, res) => {
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

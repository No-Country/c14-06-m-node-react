import { Router } from 'express';
import passport from 'passport';

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
	async (req, res) => {
		res.status(201).json({
			status: 'created',
			response: 'Inicio de sesión exitoso',
		});
	}
);

router.get('/faillogin', (req, res, next) => {
	next({ status: 401, message: 'Error de inicio de sesión' });
});

export default router;

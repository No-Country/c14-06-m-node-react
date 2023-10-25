import { Router } from 'express';
import ServicesController from '../controllers/services.controller.js';
import passport from 'passport';

const router = Router();

router.get('/', ServicesController.getAll);

router.get('/:serviceId', ServicesController.getById);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	ServicesController.addOne
);

router.post(
	'/:serviceId/qualifications',
	passport.authenticate('jwt', { session: false }),
	ServicesController.qualifyOne
);

router.put(
	'/:serviceId',
	passport.authenticate('jwt', { session: false }),
	ServicesController.updateOne
);

router.delete(
	'/:serviceId',
	passport.authenticate('jwt', { session: false }),
	ServicesController.remove
);

export default router;

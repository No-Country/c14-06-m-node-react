import { Router } from 'express';
import ServicesController from '../controllers/services.controller.js';
import passport from 'passport';
import validateDto from '../middlewares/validate-dto.middleware.js';
import {
	addQualificationBodyValidator,
	createServiceBodyValidator,
	paramsValidator,
	updateServiceBodyValidator,
} from '../schema/service.schema.js';
import multerErrorMiddleware from '../middlewares/multer-error.middleware.js';
import multer from 'multer';

const upload = multer({
	dest: './uploads',
	limits: {
		fileSize: 5242880, // cada archivo puede pesar máximo 5mb
		files: 1,
	},
});

const router = Router();

router.get('/', ServicesController.getAll);

router.get(
	'/:serviceId',
	validateDto(paramsValidator, 'params'),
	ServicesController.getById
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validateDto(createServiceBodyValidator, 'body'),
	ServicesController.addOne
);

router.post(
	'/:serviceId/qualifications',
	passport.authenticate('jwt', { session: false }),
	validateDto(addQualificationBodyValidator, 'body'),
	ServicesController.qualifyOne
);

router.put(
	'/:serviceId',
	passport.authenticate('jwt', { session: false }),
	upload.single('certificate'),
	multerErrorMiddleware,
	validateDto(paramsValidator, 'params'),
	validateDto(updateServiceBodyValidator, 'body'),
	ServicesController.updateOne
);

router.delete(
	'/:serviceId',
	passport.authenticate('jwt', { session: false }),
	validateDto(paramsValidator, 'params'),
	ServicesController.remove
);

export default router;

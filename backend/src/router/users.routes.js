import { Router } from 'express';
import multer from 'multer';
import passport from 'passport';
import validateDto from '../middlewares/validate-dto.middleware.js';
import multerErrorMiddleware from '../middlewares/multer-error.middleware.js';
import UsersController from '../controllers/users.controller.js';
import {
	paramsValidator,
	updateUserBodyValidator,
} from '../schema/user.schema.js';

const upload = multer({
	dest: './uploads',
	limits: {
		fileSize: 5242880, // cada archivo puede pesar máximo 5mb
		files: 1,
	},
});

const router = Router();

router.get(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	passport.authenticate('jwt', { session: false }),
	UsersController.getById
);

router.put(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	validateDto(updateUserBodyValidator, 'body'),
	passport.authenticate('jwt', { session: false }),
	UsersController.updateOne
);

router.patch(
	'/:userId/image',
	validateDto(paramsValidator, 'params'),
	passport.authenticate('jwt', { session: false }),
	upload.single('image'),
	multerErrorMiddleware,
	UsersController.updateImage
);

router.delete(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	passport.authenticate('jwt', { session: false }),
	UsersController.remove
);

export default router;

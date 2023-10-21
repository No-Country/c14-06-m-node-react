import { Router } from 'express';
import multer from 'multer';
import validateDto from '../middlewares/validate-dto.middleware.js';
import multerErrorMiddleware from '../middlewares/multer-error.middleware.js';
import UsersController from '../controllers/users.controller.js';
import {
	paramsValidator,
	createUserBodyValidator,
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

router.get('/', UsersController.getAll);

router.get(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	UsersController.getById
);

router.post(
	'/',
	validateDto(createUserBodyValidator, 'body'),
	UsersController.addOne
);

router.put(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	validateDto(updateUserBodyValidator, 'body'),
	UsersController.updateOne
);

router.patch(
	'/:userId/image',
	validateDto(paramsValidator, 'params'),
	upload.single('image'),
	multerErrorMiddleware,
	UsersController.updateImage
);

router.delete(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	UsersController.remove
);

export default router;

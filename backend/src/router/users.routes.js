import { Router } from 'express';
import validateDto from '../middlewares/validate-dto.middleware.js';
import UsersController from '../controllers/users.controller.js';
import {
	paramsValidator,
	createUserBodyValidator,
	updateUserBodyValidator,
} from '../schema/user.schema.js';

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

// para subir imagen
// router.patch(
// 	'/:userId/image',
// 	validateDto(paramsValidator, 'params'),
// 	UsersController
// );

router.delete(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	UsersController.remove
);

export default router;

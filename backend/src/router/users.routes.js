import { Router } from 'express';
import validateDto from '../middlewares/validate-dto.middleware.js';
import UsersController from '../controllers/users.controller.js';
import { bodyValidator, paramsValidator } from '../schema/user.schema.js';

const router = Router();

router.get('/', UsersController.getAll);

router.get(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	UsersController.getById
);

router.post('/', validateDto(bodyValidator, 'body'), UsersController.addOne);

router.put(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	validateDto(bodyValidator, 'body'),
	UsersController.updateOne
);

router.delete(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	UsersController.remove
);

export default router;

import { Router } from 'express';
import ProfessionalsController from '../controllers/professionals.controller.js';

const router = Router();

router.get('/category/:service', ProfessionalsController.getByService);

router.get(
	'/category/:service/:professionalId',
	// validateDto(paramsValidator, 'params'),
	ProfessionalsController.getById
);

router.post(
	'/',
	// validateDto(bodyValidator, 'body'),
	ProfessionalsController.addOne
);

// router.put(
// 	'/:userId',
// 	validateDto(paramsValidator, 'params'),
// 	validateDto(bodyValidator, 'body'),
// 	UsersController.updateOne
// );

// router.delete(
// 	'/:userId',
// 	validateDto(paramsValidator, 'params'),
// 	UsersController.remove
// );

export default router;

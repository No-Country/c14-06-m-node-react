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

router.put(
	'/:professionalId',
	// validateDto(paramsValidator, 'params'),
	// validateDto(bodyValidator, 'body'),
	ProfessionalsController.updateOne
);

router.delete(
	'/category/:service/:professionalId',
	// validateDto(paramsValidator, 'params'),
	ProfessionalsController.remove
);

export default router;

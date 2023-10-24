import { Router } from 'express';
import ServicesController from '../controllers/services.controller.js';

const router = Router();

router.get('/', ServicesController.getAll);

router.get('/:serviceId', ServicesController.getById);

router.post('/', ServicesController.addOne);

router.post('/:serviceId/qualifications', ServicesController.qualifyOne);

router.put('/:serviceId', ServicesController.updateOne);

router.delete('/:serviceId', ServicesController.remove);

export default router;

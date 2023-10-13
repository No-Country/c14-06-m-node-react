import { Router } from 'express';
import ServicesController from '../controllers/services.controller.js';

const router = Router();

router.get('/', ServicesController.getAll);

router.get('/category/:category', ServicesController.getByCategory);

router.get('/:serviceId', ServicesController.getById);

router.post('/', ServicesController.addOne);

router.put('/:serviceId', ServicesController.updateOne);

router.delete('/:serviceId', ServicesController.remove);

export default router;

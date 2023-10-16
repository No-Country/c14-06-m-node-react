import { Router } from 'express';
import usersRoutes from './users.routes.js';
import servicesRoutes from './services.routes.js';
import sessionRoutes from './sessions.routes.js';
import errorMiddleware from '../middlewares/error.middleware.js';

const router = Router();

//Routes
router.use('/session', sessionRoutes);
router.use('/users', usersRoutes);
router.use('/services', servicesRoutes);

//Error Middleware
router.use(errorMiddleware);

export default router;

import { Router } from 'express';
import usersRoutes from './users.routes.js';
import errorMiddleware from '../middlewares/error.middleware.js';

const router = Router();

//Routes
router.use('/users', usersRoutes);

//Error Middleware
router.use(errorMiddleware);

export default router;

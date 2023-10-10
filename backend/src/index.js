import express from 'express';
import apiRouter from './router/app.router.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use('/api', apiRouter);

//Listen
app.listen(3001, () => console.log('Server started'));

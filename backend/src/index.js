import express from 'express';
import apiRouter from './router/app.router.js';
import cors from 'cors';
import corsOptions from './utils/cors-options.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//Router
app.use('/api', apiRouter);

//Listen
app.listen(3001, () => console.log('Server started'));

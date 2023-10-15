import express from 'express';
import apiRouter from './router/app.router.js';
import cors from 'cors';
import corsOptions from './utils/cors-options.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(
	session({
		name: 'user-session',
		secret: 'sessionpassword4536',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.session());

//Router
app.use('/api', apiRouter);

//Listen
app.listen(3001, () => console.log('Server started'));

import passport from 'passport';
import local from 'passport-local';
import UsersService from '../service/users.service.js';
import { createHash, evaluatePassword } from '../utils/bcrypt.js';

const usersService = new UsersService();
const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		'register',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, user, password, done) => {
				try {
					const registeredUser = await usersService.getUserByEmail(user.email);
					if (registeredUser) {
						console.log('Email ya registrado');
						return done(null, false);
					}
					const hashedPass = await createHash(password);
					const newUser = {
						...req.body,
						password: hashedPass,
					};
					const createdUser = await usersService.createUser(newUser);
					return done(null, createdUser);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		'login',
		new LocalStrategy(
			{ usernameField: 'email' },
			async (user, password, done) => {
				try {
					const registeredUser = await usersService.getUserByEmail(user);
					if (!registeredUser) {
						return done(null, false, 'user not found');
					}
					const passControl = await evaluatePassword(registeredUser, password);
					if (!passControl) {
						return done(null, false, 'wrong user or password');
					}
					return done(null, registeredUser);
				} catch (error) {
					return done(error);
				}
			}
		)
	);
};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (id, done) => {
	const user = await usersService.getUserById(id);
	done(null, user);
});

export default initializePassport;

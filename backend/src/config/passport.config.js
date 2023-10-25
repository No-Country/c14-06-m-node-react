import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';
import UsersService from '../service/users.service.js';
import { createHash, evaluatePassword } from '../utils/bcrypt.js';
import envs from './env.config.js';
import HTTP_STATUS from '../utils/http-constants.js';
import { validatePhoneNumber } from '../utils/validate-phone.js';

const usersService = new UsersService();
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const initializePassport = () => {
	passport.use(
		'register',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, email, password, done) => {
				try {
					const { countryName, validPhone } = validatePhoneNumber(
						req.body.phone
					);
					if (!validPhone) {
						const customError = new Error(
							`Número de teléfono de ${countryName} inválido`
						);
						customError.status = HTTP_STATUS.BAD_REQUEST;
						throw customError;
					}
					const registeredUser = await usersService.getUserByEmail(email);
					if (registeredUser) {
						return done({
							status: HTTP_STATUS.BAD_REQUEST,
							message: 'Email ya registrado',
						});
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
					//Evitamos pasar los datos sensibles al token
					const finalUser = { ...registeredUser };
					delete finalUser.password;
					return done(null, finalUser);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		'jwt',
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: envs.SECRET_KEY,
			},
			async (jwt_payload, done) => {
				try {
					const { _id, iat, exp } = jwt_payload;
					return done(null, { _id, iat, exp });
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
};

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async (user, done) => {
	const registeredUser = await usersService.getUserByEmail(user.email);
	done(null, registeredUser);
});

export default initializePassport;

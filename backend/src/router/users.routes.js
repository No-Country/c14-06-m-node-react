import { Router } from 'express';
import userList from '../mock/users.js';
import validateDto from '../middlewares/validate-dto.middleware.js';
import { bodyValidator, paramsValidator } from '../schema/user.schema.js';

const router = Router();

const users = userList;

router.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		response: users,
	});
});

router.post('/', validateDto(bodyValidator, 'body'), (req, res) => {
	const user = req.body;
	users.push(user);
	res.status(201).json({
		status: 'created',
		response: users,
	});
});

router.put(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	validateDto(bodyValidator, 'body'),
	(req, res, next) => {
		const userId = +req.params.userId;
		const newUser = req.body;
		const userIndex = users.findIndex((item) => item.Id === userId);
		if (userIndex === undefined) {
			return next({
				status: 404,
				error: 'User not found',
			});
		}
		users.splice(userIndex, 1, newUser);
		res.status(200).json({
			status: 'success',
			response: 'User updated',
		});
	}
);

router.delete(
	'/:userId',
	validateDto(paramsValidator, 'params'),
	(req, res, next) => {
		const userId = +req.params.userId;
		const userIndex = users.findIndex((item) => item.Id === userId);
		if (userIndex === -1) {
			return next({
				status: 404,
				error: 'User not found',
			});
		}
		users.splice(userIndex, 1);
		res.status(200).json({
			status: 'success',
			response: 'User deleted',
		});
	}
);

export default router;

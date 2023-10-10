import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		response: 'Aloha desde users',
	});
});

router.post('/', (req, res) => {
	res.status(201).json({
		status: 'success',
		response: 'Aloha desde users',
	});
});

router.update('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		response: 'Aloha desde users',
	});
});

router.delete('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		response: 'Aloha desde users',
	});
});

export default router;

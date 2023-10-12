import ProfessionalsService from '../service/professionals.service.js';

const professionalsService = new ProfessionalsService();

class ProfessionalsController {
	static async getByService(req, res, next) {
		const { service } = req.params;
		try {
			const professionals =
				await professionalsService.getProfessionals(service);
			res.status(200).json({
				status: 'success',
				response: professionals,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { service, professionalId } = req.params;
		try {
			const professional = await professionalsService.getProfessionalById(
				service,
				professionalId
			);
			res.status(200).json({
				status: 'success',
				response: professional,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addOne(req, res, next) {
		const professionalPayload = req.body;
		try {
			const createUser =
				await professionalsService.createProfessional(professionalPayload);
			res.status(201).json({
				status: 'created',
				response: createUser,
			});
		} catch (error) {
			next(error);
		}
	}

	// static async updateOne(req, res, next) {
	// 	const { userId } = req.params;
	// 	const userPayload = req.body;
	// 	try {
	// 		const updatedUser = await usersService.updateUser(userId, userPayload);
	// 		res.status(200).json({
	// 			status: 'success',
	// 			response: updatedUser,
	// 		});
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	static async remove(req, res, next) {
		const { professionalId, service } = req.params;
		try {
			const deletedUser = await professionalsService.deleteProfessional(
				professionalId,
				service
			);
			res.status(200).json({
				status: 'success',
				response: deletedUser,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default ProfessionalsController;

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
			const createdProfessional =
				await professionalsService.createProfessional(professionalPayload);
			res.status(201).json({
				status: 'created',
				response: createdProfessional,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		const { professionalId } = req.params;
		const profesionalPayload = req.body;
		try {
			const updatedProfessional = await professionalsService.updateProfessional(
				professionalId,
				profesionalPayload
			);
			res.status(200).json({
				status: 'success',
				response: updatedProfessional,
			});
		} catch (error) {
			next(error);
		}
	}

	static async remove(req, res, next) {
		const { professionalId, service } = req.params;
		try {
			const deletedProfessional = await professionalsService.deleteProfessional(
				professionalId,
				service
			);
			res.status(200).json({
				status: 'success',
				response: deletedProfessional,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default ProfessionalsController;

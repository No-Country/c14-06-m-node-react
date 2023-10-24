import ServicesService from '../service/services.service.js';

const servicesService = new ServicesService();

class ServicesController {
	static async getAll(req, res, next) {
		const filters = req.query;
		try {
			const services = await servicesService.getServices(filters);
			res.status(200).json({
				status: 'success',
				response: services,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { serviceId } = req.params;
		try {
			const service = await servicesService.getServiceById(serviceId);
			res.status(200).json({
				status: 'success',
				response: service,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addOne(req, res, next) {
		const servicePayload = req.body;
		try {
			const createdService =
				await servicesService.createService(servicePayload);
			res.status(201).json({
				status: 'created',
				response: createdService,
			});
		} catch (error) {
			next(error);
		}
	}

	static async qualifyOne(req, res, next) {
		const { serviceId } = req.params;
		const qualificationPayload = req.body;
		try {
			const ratedService = await servicesService.qualifyService(
				serviceId,
				qualificationPayload
			);
			res.status(200).json({
				status: 'success',
				response: ratedService,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		const { serviceId } = req.params;
		const servicePayload = req.body;
		try {
			const updatedProfessional = await servicesService.updateService(
				serviceId,
				servicePayload
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
		const { serviceId } = req.params;
		try {
			const deletedService = await servicesService.deleteService(serviceId);
			res.status(200).json({
				status: 'success',
				response: deletedService,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default ServicesController;

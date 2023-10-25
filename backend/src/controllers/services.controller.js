import ServicesService from '../service/services.service.js';
import { deleteTempFilesBuffers } from '../utils/cloudinary.js';
import { validateFileExtension } from '../utils/validate-file-extension.js';

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
		const userId = req.user._id;
		try {
			const createdService = await servicesService.createService(
				servicePayload,
				userId
			);
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
		const userId = req.user._id;
		try {
			const ratedService = await servicesService.qualifyService(
				serviceId,
				qualificationPayload,
				userId
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
		const userId = req.user._id;

		let { file = null } = req;
		/* file = {
			fieldname: 'image',
			originalname: 'Gabriel Althaparro profile photo.jpeg',
			encoding: '7bit',
			mimetype: 'image/jpeg',
			destination: './uploads',
			filename: 'c8d2534fefe05ebb2e2836f9dedab7c4',
			path: 'uploads/c8d2534fefe05ebb2e2836f9dedab7c4',
			size: 81115
		} */

		try {
			if (file !== null) {
				const VALID_EXTENSIONS = ['jpg', 'png', 'jpeg', 'webp', 'pdf'];
				validateFileExtension(file.originalname, VALID_EXTENSIONS);
			}

			servicePayload.certificate = file?.path;
			const updatedProfessional = await servicesService.updateService(
				serviceId,
				servicePayload,
				userId
			);

			res.status(200).json({
				status: 'success',
				response: updatedProfessional,
			});
		} catch (error) {
			next(error);
		} finally {
			if (file) await deleteTempFilesBuffers([file]);
		}
	}

	static async remove(req, res, next) {
		const { serviceId } = req.params;
		const userId = req.user._id;
		try {
			const deletedService = await servicesService.deleteService(
				serviceId,
				userId
			);
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

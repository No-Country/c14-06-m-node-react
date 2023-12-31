import UsersService from '../service/users.service.js';
import ServicesService from '../service/services.service.js';
import QualificationsService from '../service/qualifications.service.js';
import HTTP_STATUS from '../utils/http-constants.js';
import { validatePhoneNumber } from '../utils/validate-phone.js';
import { deleteTempFilesBuffers } from '../utils/cloudinary.js';
import { validateFileExtension } from '../utils/validate-file-extension.js';

const usersService = new UsersService();
const servicesService = new ServicesService();
const qualificationsService = new QualificationsService();

class UsersController {
	static async getAll(req, res, next) {
		const filters = req.query;
		try {
			const users = await usersService.getUsers(filters);
			res.status(200).json({
				status: 'success',
				response: users,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { userId } = req.params;
		const userIdToken = req.user._id;
		try {
			const user = await usersService.getUserById(userId, userIdToken);
			res.status(200).json({
				status: 'success',
				response: user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		const { userId } = req.params;
		const userIdToken = req.user._id;
		const userPayload = req.body;
		try {
			if (userPayload.phone !== undefined) validateUserPhone(userPayload);
			const updatedUser = await usersService.updateUser(
				userId,
				userPayload,
				userIdToken
			);
			res.status(200).json({
				status: 'success',
				response: updatedUser,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateImage(req, res, next) {
		const { userId } = req.params;
		const userIdToken = req.user._id;
		const { file } = req;
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
			if (file === undefined) {
				const customError = new Error('Por favor, suba una foto');
				customError.status = HTTP_STATUS.BAD_REQUEST;
				throw customError;
			}

			const VALID_EXTENSIONS = ['jpg', 'png', 'jpeg', 'webp', 'gif'];
			validateFileExtension(file.originalname, VALID_EXTENSIONS);

			const updatedUser = await usersService.updateImage(
				userId,
				userIdToken,
				file.path
			);
			res.status(200).json({
				status: 'success',
				response: updatedUser,
			});
		} catch (error) {
			next(error);
		} finally {
			if (file) await deleteTempFilesBuffers([file]);
		}
	}

	static async remove(req, res, next) {
		const { userId } = req.params;
		const userIdToken = req.user._id;
		try {
			const deletedUser = await usersService.deleteUser(userId, userIdToken);
			deletedUser.servicesRef?.forEach(async (service) => {
				await servicesService.deleteService(service._id);
			});
			const qualificationsToDelete =
				await qualificationsService.deleteQualificationByUser(userId);
			qualificationsToDelete.forEach(async (qualification) => {
				await servicesService.removeQualification(qualification);
			});
			res.status(200).json({
				status: 'success',
				response: deletedUser,
			});
		} catch (error) {
			next(error);
		}
	}
}

const validateUserPhone = (user) => {
	const { countryName, validPhone } = validatePhoneNumber(user.phone);
	if (!validPhone) {
		const customError = new Error(
			`Número de teléfono de ${countryName} inválido`
		);
		customError.status = HTTP_STATUS.BAD_REQUEST;
		throw customError;
	}
};

export default UsersController;

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cloudinary from '../config/cloudinary.config.js';
import fs from 'fs/promises';

const FOLDER_NAME = 'servicios-club';
const START_OF_PUBLIC_ID = 7; // publicId inicia en: servicios-club/wdtgzbelsdrxdonls13q
const PATH_TO_ROOT = '../../';

export const getPublicIdFromCloudinaryUrl = (cloudinaryUrl) => {
	/* https://res.cloudinary.com/dwjrabkle/image/upload/v1697927952/servicios-club/wdtgzbelsdrxdonls13q.jpg */
	const publicIdWithExtension = cloudinaryUrl
		.split('/')
		.slice(START_OF_PUBLIC_ID)
		.join('/');
	const [publicId] = publicIdWithExtension.split('.'); // separo entre el path y la extension, porque el publicId es sin la extensión
	// servicios-club/wdtgzbelsdrxdonls13q
	return publicId;
};

export const saveToCloudinary = async (relativePathFile) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const absolutePathFile = path.join(__dirname, PATH_TO_ROOT, relativePathFile);
	try {
		const { public_id: publicId, secure_url: secureUrl } =
			await cloudinary.uploader.upload(absolutePathFile, {
				folder: FOLDER_NAME,
			});
		return { publicId, secureUrl };
	} catch (err) {
		console.log(err);
		throw 'Error al subir imagen a cloudinary';
	}
};

export const deleteFromCloudinary = async (publicId) => {
	/* servicios-club/wdtgzbelsdrxdonls13q */
	try {
		const { result } = await cloudinary.uploader.destroy(publicId);
		if (result !== 'ok') throw result;
	} catch (err) {
		console.log(err);
		console.log('Error al borrar una imagen de cloudinary');
	}
};

export const deleteTempFilesBuffers = async (files) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const projectRootDirectory = path.join(__dirname, PATH_TO_ROOT);

	for (const file of files) {
		const filePath = path.join(projectRootDirectory, file.path);
		try {
			await fs.unlink(filePath);
		} catch (error) {
			console.log(error);
		}
	}
};

import HTTP_STATUS from './http-constants.js';

export const validateFileExtension = (filename, validExtensions) => {
	const splittedFilename = filename.split('.');
	const extension = splittedFilename[splittedFilename.length - 1];
	if (!validExtensions.includes(extension)) {
		const customError = new Error(
			`Extensión del archivo inválida: '${filename}'`
		);
		customError.status = HTTP_STATUS.BAD_REQUEST;
		throw customError;
	}
};

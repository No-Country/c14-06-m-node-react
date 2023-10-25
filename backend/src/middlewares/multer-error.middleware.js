import multer from 'multer';
import HTTP_STATUS from '../utils/http-constants.js';
const multerErrorMiddleware = (err, req, res, next) => {
	console.log(err);
	if (err instanceof multer.MulterError) {
		const customError = new Error(
			'Error de formulario de archivo: ' + err.message
		);
		customError.status = HTTP_STATUS.BAD_REQUEST;
		next(customError);
	} else {
		next(err);
	}
};

export default multerErrorMiddleware;

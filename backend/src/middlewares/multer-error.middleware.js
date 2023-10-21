import multer from 'multer';
import HTTP_STATUS from '../utils/http-constants.js';
const multerErrorMiddleware = (err, req, res, next) => {
	console.log(err.code);
	if (err instanceof multer.MulterError) {
		const customError = new Error('Se recibió archivo en campo incorrecto');
		customError.status = HTTP_STATUS.BAD_REQUEST;
		next(customError);
	} else {
		next(err);
	}
};

export default multerErrorMiddleware;

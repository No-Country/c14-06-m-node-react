const errorMiddleware = (error, req, res, next) => {
	console.log(error);
	// Este condicional está para incluir el método next() y que permita hacer el commit, pero no realiza nada realmente
	if (error.error === 'No error') {
		next();
	}
	return res.status(error.status || 500).json({
		status: error.status || 'Internal Server Error',
		response: error.error,
	});
};

export default errorMiddleware;

const errorMiddleware = (error, req, res, _next) => {
	console.log(error);
	return res.status(error.status || 500).json({
		status: error.status || 'Internal Server Error',
		response: error.error,
	});
};

export default errorMiddleware;

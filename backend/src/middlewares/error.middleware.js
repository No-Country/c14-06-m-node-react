const errorMiddleware = (error, req, res, _next) => {
	console.log('ERROR => ' + error.message);
	return res.status(error.status || 500).json({
		status: error.status || 500,
		response: error.message || 'Internal Server Error',
	});
};

export default errorMiddleware;

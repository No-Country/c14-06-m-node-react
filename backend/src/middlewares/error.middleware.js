const errorMiddleware = (error, req, res) => {
	console.log(error);
	return res.status(error.status || 500).json({
		status: 'error',
		response: error,
	});
};

export default errorMiddleware;

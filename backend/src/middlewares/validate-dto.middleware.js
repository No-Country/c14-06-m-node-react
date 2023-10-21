function validateDto(ajvValidate, obj) {
	const regex = /^(body|params|query|headers)$/;
	if (!regex.test(obj)) {
		console.log(
			'validateDto expects body|params|query|headers, recieved: ' + obj
		);
		process.exit(1);
	}
	return (req, res, next) => {
		const isValid = ajvValidate(req[obj]);
		if (!isValid) {
			const errorMessages = ajvValidate.errors.reduce(
				(acc, error, i, errors) => {
					if (
						error.instancePath === '' ||
						errors.findIndex(
							(err) => err.instancePath === error.instancePath
						) === i
					) {
						// si fue error de required del campo o si no hubo un error de ese campo previamente
						if (!acc.includes(error.message)) {
							// si no es un mensaje repetido
							acc.push(String(error.message));
						}
					}
					return acc;
				},
				[]
			);
			const customError = new Error(errorMessages[0]);
			customError.status = 400;
			return next(customError);
		}
		next();
	};
}

export default validateDto;

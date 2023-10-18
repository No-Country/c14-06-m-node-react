import HTTP_STATUS from './http-constants.js';

const phoneNumbers = {
	// numero de argentina
	'+54': {
		countryName: 'Argentina',
		// Comienza con '+54' y luego 2 a 4 dígitos (código de área), luego 6 a 8 dígitos (número de teléfono)
		validate: (numberPhone) => {
			const regex = /^\d{10}$/;
			return regex.test(numberPhone);
		},
	},
};

export const validatePhoneNumber = (phone) => {
	const [countryCode, number] = phone.split(' ');

	if (phoneNumbers[countryCode] === undefined) {
		const customError = new Error('El código de país del teléfono es inválido');
		customError.status = HTTP_STATUS.BAD_REQUEST;
		throw customError;
	}

	const countryName = phoneNumbers[countryCode].countryName;
	const validPhone = phoneNumbers[countryCode].validate(number);
	return { countryName, validPhone };
};

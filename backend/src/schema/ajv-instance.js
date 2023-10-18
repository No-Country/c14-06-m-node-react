import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { ObjectId } from 'mongodb';

const ajvInstance = new Ajv({
	allErrors: true,
	coerceTypes: true,
	strict: true,
	strictNumbers: true,
	strictRequired: true,
	strictSchema: true,
});
addFormats(ajvInstance);
addErrors(ajvInstance);

ajvInstance.addFormat('ObjectId', {
	type: 'string',
	validate: (data) => ObjectId.isValid(data),
});

export default ajvInstance;

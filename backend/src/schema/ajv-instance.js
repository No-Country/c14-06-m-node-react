import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const ajvInstance = new Ajv({ allErrors: true, coerceTypes: true });
addFormats(ajvInstance);
addErrors(ajvInstance);

export default ajvInstance;

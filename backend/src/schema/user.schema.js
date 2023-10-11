import ajvInstance from './ajv-instance.js';

const userSchema = {
	id: {
		$id: 'userId',
		description: 'ID del usuario',
		type: 'string',
	},

	name: {
		$id: 'userName',
		description: 'Nombre del usuario',
		type: 'string',
		minLength: 0,
		maxLength: 50,
		pattern: '^[a-z-A-Z0-9ñÑáéíóúÁÉÍÓÚüÜ ]*$',
		errorMessage: {
			minLength: 'Nombre inválido, no puede estar vacío',
			maxLength: 'Nombre inválido, máximo 50 caracteres',
			pattern: 'Nombre inválido',
		},
	},

	surname: {
		$id: 'userSurname',
		description: 'Apellido del usuario',
		type: 'string',
		minLength: 0,
		maxLength: 50,
		pattern: '^[a-z-A-Z0-9ñÑáéíóúÁÉÍÓÚüÜ ]*$',
		errorMessage: {
			minLength: 'Apellido inválido, no puede estar vacío',
			maxLength: 'Apellido inválido, máximo 50 caracteres',
			pattern: 'Apellido inválido',
		},
	},

	email: {
		$id: 'userEmail',
		description: 'Email del usuario',
		type: 'string',
		format: 'email',
		maxLength: 75,
		errorMessage: {
			format: 'Estructura de email inválida',
			maxLength: 'Email inválido, máximo 75 caracteres',
		},
	},

	password: {
		$id: 'userPassword',
		description: 'Constraseña del usuario',
		type: 'string',
		minLength: 8,
		errorMessage: {
			minLength: 'Por favor, ingrese una contraseña con al menos 8 caracteres',
		},
	},
};

const bodySchema = {
	type: 'object',
	required: ['name', 'surname', 'email', 'password'],
	errorMessage: {
		required: {
			name: 'Por favor, ingrese su nombre',
			surname: 'Por favor, ingrese su apellido',
			email: 'Por favor, ingrese su email',
			password: 'Por favor, ingrese su contraseña',
		},
	},
	properties: {
		name: userSchema.name,
		surname: userSchema.surname,
		email: userSchema.email,
		password: userSchema.password,
	},
	additionalProperties: false,
};

const paramsSchema = {
	type: 'object',
	required: ['userId'],
	errorMessage: {
		required: {
			userId: 'Por favor, ingrese el ID del usuario',
		},
	},
	properties: {
		userId: userSchema.id,
	},
	additionalProperties: false,
};

export const bodyValidator = ajvInstance.compile(bodySchema);
export const paramsValidator = ajvInstance.compile(paramsSchema);

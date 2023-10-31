import ajvInstance from './ajv-instance.js';

export const userSchema = {
	id: {
		$id: 'userId',
		description: 'ID del usuario',
		type: 'string',
		format: 'ObjectId',
		errorMessage: 'ID inválido',
	},

	name: {
		$id: 'userName',
		description: 'Nombre del usuario',
		type: 'string',
		minLength: 1,
		maxLength: 50,
		pattern:
			'^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ]{1}[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ ]*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ]{1}$',
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
		minLength: 1,
		maxLength: 50,
		pattern:
			'^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ]{1}[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ ]*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ]{1}$',
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

	phone: {
		$id: 'userPhone',
		type: 'string',
		// pattern: '^((\\+\\d{1,3}(\\s)?)?\\d{6,14})$',
		pattern: '^\\+\\d{1,3} \\d{8,10}$',
		errorMessage:
			'Por favor, ingrese un número de teléfono válido (código de país y número). Ejemplos: +54 1149453047, +1 6502530000',
	},

	profileImg: {
		$id: 'userImage',
		description: 'URL de imágen del usuario',
		type: 'string',
		// format: 'uri',
		pattern: '^https://[a-zA-Z0-9\\.\\-\\/\\?&~=_]+$',
		maxLength: 500,
		errorMessage: 'Url de imágen inválida',
	},

	location: {
		$id: 'userLocation',
		type: 'string',
		minLength: 4,
		errorMessage: 'Por favor, ingrese su ubicación',
	},

	role: {
		$id: 'userRole',
		type: 'string',
		enum: ['user', 'pro'],
		errorMessage: 'Rol inválido. Por favor ingrese "user" o "pro"',
	},
};

const createUserBodySchema = {
	type: 'object',
	required: [
		'name',
		'surname',
		'email',
		'password',
		'phone',
		'location',
		'role',
	],
	errorMessage: {
		required: {
			name: 'Por favor, ingrese su nombre',
			surname: 'Por favor, ingrese su apellido',
			email: 'Por favor, ingrese su email',
			password: 'Por favor, ingrese su contraseña',
			phone: 'Por favor, ingrese su teléfono',
			location: 'Por favor, ingrese su ubicación',
			role: 'Por favor, ingrese su rol',
		},
	},
	properties: {
		name: userSchema.name,
		surname: userSchema.surname,
		email: userSchema.email,
		password: userSchema.password,
		phone: userSchema.phone,
		location: userSchema.location,
		role: userSchema.role,
		profileImg: userSchema.profileImg,
	},
	additionalProperties: false,
};

const updateUserBodySchema = {
	type: 'object',
	properties: {
		name: userSchema.name,
		surname: userSchema.surname,
		email: userSchema.email,
		phone: userSchema.phone,
		location: userSchema.location,
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

export const createUserBodyValidator =
	ajvInstance.compile(createUserBodySchema);
export const updateUserBodyValidator =
	ajvInstance.compile(updateUserBodySchema);

export const paramsValidator = ajvInstance.compile(paramsSchema);

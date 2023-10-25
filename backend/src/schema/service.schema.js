import ajvInstance from './ajv-instance.js';

const qualifications = {
	$id: 'serviceQualification',
	type: 'object',
	required: ['score', 'comment'],
	errorMessage: {
		required: {
			score: 'Por favor, ingrese la calficación',
			comment: 'Por favor, ingrese un comentario',
		},
	},
	properties: {
		score: {
			type: 'number',
			minimum: 1,
			maximum: 5,
			errorMessage:
				'Por favor, ingrese un valor entre 1 y 5 para calificar el servicio',
		},
		comment: {
			type: 'string',
			minLength: 5,
			errorMessage: 'Por favor, ingrese un comentario más largo',
		},
	},
};

ajvInstance.addSchema(qualifications);

const serviceSchema = {
	id: {
		$id: 'serviceId',
		type: 'string',
		format: 'ObjectId',
		errorMessage: 'ID de servicio inválido',
	},

	category: {
		$id: 'serviceCategory',
		type: 'string',
		enum: [
			'bricklayer', // Albañiles
			'carpenter', // Carpinteros
			'locksmith', // Cerrajeros
			'electrician', // Electricistas
			'freight', // Fleteros
			'fumigator', // Fumigadores
			'gas-fitter', // Gasistas
			'gardener', // Jardineros
			'painter', // Pintores
			'plumber', // Plomeros
			'air-conditioner', // Técnicos en Aire Acondicionado
			'appliance', // Técnicos en Electrodomesticos
		],
		errorMessage: 'Por favor, ingrese una categoría válida',
		// format: 'ObjectId',
		// errorMessage: 'ID de categoría inválido',
	},

	userRef: {
		$id: 'serviceUserId',
		type: 'string',
		format: 'ObjectId',
		errorMessage: 'ID del profesional del servicio inválido',
	},

	description: {
		$id: 'serviceDescription',
		type: 'string',
		minLength: 1,
		errorMessage: {
			minLength: 'Descripción inválida, no puede estar vacía',
		},
	},

	qualifications: {
		type: 'array',
		items: { $ref: 'serviceQualification' },
	},

	location: {
		$id: 'serviceLocation',
		type: 'string',
		minLength: 3,
		errorMessage: 'Por favor, ingrese una ubicación más larga',
	},

	// certified: {
	// 	$id: 'certifiedService',
	// 	type: 'boolean',
	// 	errorMessage: 'Por favor, indique si tiene certificación',
	// },

	// active: {
	// 	$id: 'activeService',
	// 	type: 'boolean',
	// 	errorMessage: 'Por favor, indique si el servicio está activo',
	// },

	/* 	serviceImg: {
			$id: 'serviceImage',
			description: 'URL de imágen del usuario',
			type: 'string',
			format: 'uri',
			pattern: '^https://[a-zA-Z0-9\\.\\-\\/\\?&~=_]+$',
			maxLength: 150,
			errorMessage: 'Url de imágen inválida',
		}, */
};

const createServiceBodySchema = {
	type: 'object',
	required: ['category', 'userRef', 'description', 'location'],
	errorMessage: {
		required: {
			category: 'Por favor, ingrese la categoría del servicio',
			userRef: 'Por favor, ingrese el ID del profesional',
			description: 'Por favor, ingrese una descripcion para el servicio',
			location: 'Por favor, ingrese la ubicación de su servicio',
		},
	},
	properties: {
		category: serviceSchema.category,
		userRef: serviceSchema.userRef,
		description: serviceSchema.description,
		location: serviceSchema.location,
	},
	additionalProperties: false,
};

const updateServiceBodySchema = {
	type: 'object',
	properties: {
		category: serviceSchema.category,
		description: serviceSchema.description,
		location: serviceSchema.location,
	},
	// additionalProperties: false,
};

const addQualificationBodySchema = { $ref: 'serviceQualification' };

const paramsSchema = {
	type: 'object',
	required: ['serviceId'],
	errorMessage: {
		required: {
			serviceId: 'Por favor, ingrese el ID del servicio',
		},
	},
	properties: {
		serviceId: serviceSchema.id,
	},
	additionalProperties: false,
};

export const updateServiceBodyValidator = ajvInstance.compile(
	updateServiceBodySchema
);
export const createServiceBodyValidator = ajvInstance.compile(
	createServiceBodySchema
);
export const addQualificationBodyValidator = ajvInstance.compile(
	addQualificationBodySchema
);

export const paramsValidator = ajvInstance.compile(paramsSchema);

const allowedOrigins = [
	'https://www.serviciosclub.com',
	'http://localhost:3000',
];

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export default corsOptions;

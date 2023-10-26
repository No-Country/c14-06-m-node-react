import { MongoClient, ServerApiVersion } from 'mongodb';
import envs from '../config/env.config.js';

const mongoUri = `mongodb+srv://${envs.MONGODB_USER}:${envs.MONGODB_PASS}@serviciosclub.vrc9alz.mongodb.net/?retryWrites=true`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db;
export const connectDB = async () => {
	if (!db) {
		await client.connect();
		db = client.db('ServiciosClub');
	}
	return db;
};

import { v2 as cloudinary } from 'cloudinary';
import envs from './env.config.js';

cloudinary.config(envs.CLOUDINARY_URL);

export default cloudinary;

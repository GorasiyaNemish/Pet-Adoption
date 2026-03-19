import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getConfig = () => {
  return {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pet-adoption',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_for_dev',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@dev.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123456'
  };
};

const env = getConfig();

export default env;

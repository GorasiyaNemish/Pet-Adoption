import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const getConfig = () => {
  return {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/pet-adoption',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_for_dev'
  };
};

const env = getConfig();

export default env;

import mongoose from 'mongoose';
import env from './env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

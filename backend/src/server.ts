import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import env from './config/env';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Pet Adoption API is running...');
});

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

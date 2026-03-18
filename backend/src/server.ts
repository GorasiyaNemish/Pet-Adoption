import express, { Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import env from './config/env';

import authRoutes from './routes/authRoutes';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Pet Adoption API is running...');
});

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

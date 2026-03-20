import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import env from './config/env';

import authRoutes from './routes/authRoutes';
import petRoutes from './routes/petRoutes';
import adoptionRoutes from './routes/adoptionRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { seedAdmin } from './utils/seeder';

const app = express();

// Middleware
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://pet-adoption-b4gn3b78a-gorasiya-nemishs-projects.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Pet Adoption API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Initialize Database & Seeding then start server
const startApp = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Auto-Seed Admin if not exists
    await seedAdmin();

    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Application failed to start: ${error.message}`);
    process.exit(1);
  }
};

startApp();

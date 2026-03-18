import { Request, Response, NextFunction } from 'express';
import env from '../config/env';

// Handle 404 Not Found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Centralized Error Handler
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    // Only show stack trace in development
    stack: env.NODE_ENV === 'production' ? null : err.stack,
  });
};

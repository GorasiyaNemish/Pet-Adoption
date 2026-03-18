import jwt from 'jsonwebtoken';
import env from '../config/env';
import { Types } from 'mongoose';

export const generateToken = (id: Types.ObjectId | string): string => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

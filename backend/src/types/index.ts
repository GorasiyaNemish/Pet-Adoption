import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: 'visitor' | 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface IPet extends Document {
  _id: Types.ObjectId;
  name: string;
  species: string;
  breed?: string;
  age: number; // in months or years based on business logic
  gender: 'male' | 'female' | 'unknown';
  description?: string;
  status: 'available' | 'pending' | 'adopted';
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdoption extends Document {
  _id: Types.ObjectId;
  pet: Types.ObjectId | IPet;
  applicant: Types.ObjectId | IUser;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: Date; // mapped to appliedAt
  updatedAt: Date;
}

import mongoose, { Schema } from 'mongoose';
import { IPet } from '../types';

const petSchema = new Schema<IPet>(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number, required: true },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'unknown'], 
      default: 'unknown' 
    },
    description: { type: String },
    status: { 
      type: String, 
      enum: ['available', 'pending', 'adopted'], 
      default: 'available' 
    },
    photoUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IPet>('Pet', petSchema);

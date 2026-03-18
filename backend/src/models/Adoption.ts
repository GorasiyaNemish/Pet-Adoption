import mongoose, { Schema } from 'mongoose';
import { IAdoption } from '../types';

const adoptionSchema = new Schema<IAdoption>(
  {
    pet: { 
      type: Schema.Types.ObjectId, 
      ref: 'Pet', 
      required: true 
    },
    applicant: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    },
    message: { type: String }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model<IAdoption>('Adoption', adoptionSchema);

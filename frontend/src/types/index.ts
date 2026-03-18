export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  token?: string;
}

export interface Pet {
  _id: string;
  name: string;
  species: string;
  breed?: string;
  age: number;
  gender: 'male' | 'female' | 'unknown';
  description?: string;
  status: 'available' | 'pending' | 'adopted';
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionApplication {
  _id: string;
  pet: string | Pet;
  applicant: string | User;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

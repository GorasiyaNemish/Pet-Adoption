import axiosInstance from './axiosInstance';
import type { Pet } from '../types';

interface FetchPetsResponse {
  success: boolean;
  data: Pet[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

export const fetchPets = async (params: any): Promise<FetchPetsResponse> => {
  const response = await axiosInstance.get<FetchPetsResponse>('/pets', { params });
  return response.data;
};

export const fetchPetById = async (id: string): Promise<{ success: boolean; data: Pet }> => {
  const response = await axiosInstance.get<{ success: boolean; data: Pet }>(`/pets/${id}`);
  return response.data;
};

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

export const createPet = async (petData: any): Promise<{ success: boolean; data: Pet }> => {
  const response = await axiosInstance.post<{ success: boolean; data: Pet }>('/pets', petData);
  return response.data;
};

export const updatePet = async (id: string, petData: any): Promise<{ success: boolean; data: Pet }> => {
  const response = await axiosInstance.put<{ success: boolean; data: Pet }>(`/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(`/pets/${id}`);
  return response.data;
};


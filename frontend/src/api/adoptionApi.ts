import axiosInstance from './axiosInstance';
import type { AdoptionApplication } from '../types';

interface AdoptionResponse {
  success: boolean;
  data: AdoptionApplication;
  message?: string;
}

export const applyForAdoption = async (petId: string, message?: string): Promise<AdoptionResponse> => {
  const response = await axiosInstance.post<AdoptionResponse>('/adoptions', { petId, message });
  return response.data;
};

export const fetchMyAdoptions = async (): Promise<{ success: boolean; data: AdoptionApplication[] }> => {
  const response = await axiosInstance.get<{ success: boolean; data: AdoptionApplication[] }>('/adoptions/me');
  return response.data;
};

export const fetchAllAdoptions = async (): Promise<{ success: boolean; data: AdoptionApplication[] }> => {
  const response = await axiosInstance.get<{ success: boolean; data: AdoptionApplication[] }>('/adoptions');
  return response.data;
};

export const updateAdoptionStatus = async (id: string, status: string): Promise<AdoptionResponse> => {
  const response = await axiosInstance.put<AdoptionResponse>(`/adoptions/${id}/status`, { status });
  return response.data;
};

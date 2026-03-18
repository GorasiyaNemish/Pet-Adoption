import axiosInstance from './axiosInstance';
import type { User } from '../types';

interface AuthResponse {
  success: boolean;
  data: User & { token: string };
  message?: string;
  errors?: Array<{ msg: string; path: string }>;
}

export const register = async (userData: any): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

export const login = async (credentials: any): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

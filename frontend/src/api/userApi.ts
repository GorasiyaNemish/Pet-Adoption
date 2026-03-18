import axiosInstance from './axiosInstance';
import type { User } from '../types';

export const getProfile = async (): Promise<{ success: boolean; data: User }> => {
  const response = await axiosInstance.get<{ success: boolean; data: User }>('/auth/me');
  return response.data;
};

export const updateProfile = async (userData: { name?: string; email?: string }): Promise<{ success: boolean; data: User }> => {
  const response = await axiosInstance.put<{ success: boolean; data: User }>('/auth/profile', userData);
  return response.data;
};

export const updatePassword = async (passwordData: any): Promise<{ success: boolean }> => {
  const response = await axiosInstance.put<{ success: boolean }>('/auth/password', passwordData);
  return response.data;
};

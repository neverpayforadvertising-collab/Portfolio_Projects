import { apiClient } from './apiClient';
import { Product } from '../types';

export const fetchProducts = async (filters: Record<string, string | undefined>): Promise<Product[]> => {
  const response = await apiClient.get('/catalog', { params: filters });
  return response.data;
};

export const saveProduct = async (product: Omit<Product, 'id' | 'updatedAt'>) => {
  const response = await apiClient.post('/catalog', product);
  return response.data;
};

export const scheduleBulkUpdate = async (payload: { ids: number[]; update: { price?: number; status?: string; stock?: number } }) => {
  const response = await apiClient.post('/catalog/bulk-update', payload);
  return response.data;
};

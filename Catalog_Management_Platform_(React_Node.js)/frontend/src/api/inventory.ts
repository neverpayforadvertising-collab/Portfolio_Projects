import { apiClient } from './apiClient';

export const fetchInventory = async (filters: Record<string, string | undefined>) => {
  const response = await apiClient.get('/inventory', { params: filters });
  return response.data;
};

export const updateInventory = async (payload: { sku: string; region: string; quantity: number; reason?: string }) => {
  const response = await apiClient.post('/inventory/update', payload);
  return response.data;
};

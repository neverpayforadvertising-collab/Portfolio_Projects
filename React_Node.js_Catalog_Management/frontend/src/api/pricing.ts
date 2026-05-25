import { apiClient } from './apiClient';

export const fetchPricingRules = async (filters: Record<string, string | undefined>) => {
  const response = await apiClient.get('/pricing', { params: filters });
  return response.data;
};

export const overridePricing = async (payload: {
  sku: string;
  region: string;
  adjustmentType: 'absolute' | 'percent';
  adjustmentValue: number;
  reason: string;
}) => {
  const response = await apiClient.post('/pricing/override', payload);
  return response.data;
};

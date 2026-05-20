import * as pricingRepo from '../repositories/pricingRepository.js';
import { PricingRule } from '../models/pricingRule.js';

export const getPricingRules = async (filters: Record<string, string | undefined>): Promise<PricingRule[]> => {
  return pricingRepo.getPricingRules(filters);
};

export const overridePricing = async (payload: Omit<PricingRule, 'id' | 'createdAt'>): Promise<number> => {
  return pricingRepo.overridePricingRule(payload);
};

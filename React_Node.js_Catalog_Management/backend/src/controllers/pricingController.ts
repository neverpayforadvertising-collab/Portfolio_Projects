import { RequestHandler } from 'express';
import * as pricingService from '../services/pricingService.js';

export const getPricingRules: RequestHandler = async (req, res) => {
  const rules = await pricingService.getPricingRules(req.query as Record<string, string | undefined>);
  res.json(rules);
};

export const overridePricingRule: RequestHandler = async (req, res) => {
  const id = await pricingService.overridePricing(req.body);
  res.status(201).json({ id });
};

import Joi from 'joi';

export const productSearchSchema = Joi.object({
  term: Joi.string().allow('').optional(),
  category: Joi.string().allow('').optional(),
  region: Joi.string().allow('').optional(),
  status: Joi.string().valid('active', 'inactive', '').optional()
});

export const productCreateSchema = Joi.object({
  sku: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  description: Joi.string().trim().allow('').optional(),
  category: Joi.string().trim().required(),
  price: Joi.number().greater(0).required(),
  regions: Joi.array().items(Joi.string().trim()).min(1).required(),
  stock: Joi.number().integer().min(0).required(),
  status: Joi.string().valid('active', 'inactive').required()
});

export const bulkUpdateSchema = Joi.object({
  ids: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
  update: Joi.object({
    price: Joi.number().greater(0).optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
    stock: Joi.number().integer().min(0).optional()
  }).required()
});

export const pricingSearchSchema = Joi.object({
  sku: Joi.string().trim().allow('').optional(),
  region: Joi.string().trim().allow('').optional()
});

export const pricingOverrideSchema = Joi.object({
  sku: Joi.string().trim().required(),
  region: Joi.string().trim().required(),
  adjustmentType: Joi.string().valid('absolute', 'percent').required(),
  adjustmentValue: Joi.number().required(),
  reason: Joi.string().trim().required()
});

export const inventorySearchSchema = Joi.object({
  sku: Joi.string().trim().allow('').optional(),
  region: Joi.string().trim().allow('').optional()
});

export const inventoryUpdateSchema = Joi.object({
  sku: Joi.string().trim().required(),
  region: Joi.string().trim().required(),
  quantity: Joi.number().integer().min(0).required(),
  reason: Joi.string().trim().optional()
});

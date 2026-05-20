import { RequestHandler } from 'express';
import * as catalogService from '../services/catalogService.js';
import * as taskService from '../services/taskService.js';

export const getProducts: RequestHandler = async (req, res) => {
  const products = await catalogService.searchProducts(req.query as Record<string, string | undefined>);
  res.json(products);
};

export const getProductById: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const product = await catalogService.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
};

export const createOrUpdateProduct: RequestHandler = async (req, res) => {
  const id = await catalogService.createOrUpdateProduct(req.body);
  res.status(201).json({ id });
};

export const bulkUpdateCatalog: RequestHandler = async (req, res) => {
  const jobId = await taskService.enqueueBulkUpdate(req.body);
  res.status(202).json({ message: 'Bulk update scheduled', jobId });
};

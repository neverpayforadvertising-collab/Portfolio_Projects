import { RequestHandler } from 'express';
import * as inventoryService from '../services/inventoryService.js';

export const getInventory: RequestHandler = async (req, res) => {
  const inventory = await inventoryService.getInventory(req.query as Record<string, string | undefined>);
  res.json(inventory);
};

export const updateInventory: RequestHandler = async (req, res) => {
  const id = await inventoryService.updateInventory(req.body);
  res.status(201).json({ id });
};

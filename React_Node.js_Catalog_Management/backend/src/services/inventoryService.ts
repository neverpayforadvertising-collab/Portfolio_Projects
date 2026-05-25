import * as inventoryRepo from '../repositories/inventoryRepository.js';
import { InventoryRecord } from '../models/inventory.js';

export const getInventory = async (filters: Record<string, string | undefined>): Promise<InventoryRecord[]> => {
  return inventoryRepo.getInventoryRecords(filters);
};

export const updateInventory = async (payload: Omit<InventoryRecord, 'id' | 'lastUpdated'>): Promise<number> => {
  return inventoryRepo.updateInventory(payload);
};

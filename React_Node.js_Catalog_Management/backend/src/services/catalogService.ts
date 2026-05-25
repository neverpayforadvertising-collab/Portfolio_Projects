import { Product } from '../models/product.js';
import * as catalogRepo from '../repositories/catalogRepository.js';
import { getCache, setCache, flushCache } from '../utils/redisClient.js';

const CACHE_KEY = 'catalog:products';

export const searchProducts = async (filters: Record<string, string | undefined>): Promise<Product[]> => {
  const cacheKey = `${CACHE_KEY}:${JSON.stringify(filters)}`;
  const cached = await getCache<Product[]>(cacheKey);
  if (cached) {
    return cached;
  }

  const results = await catalogRepo.searchProducts(filters);
  await setCache(cacheKey, results, 90);
  return results;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return catalogRepo.getProductById(id);
};

export const createOrUpdateProduct = async (payload: Omit<Product, 'id' | 'updatedAt'>): Promise<number> => {
  const id = await catalogRepo.upsertProduct(payload);
  await flushCache(CACHE_KEY);
  return id;
};

export const bulkUpdateCatalog = async (ids: number[], update: Partial<Pick<Product, 'price' | 'status' | 'stock'>>): Promise<number> => {
  const count = await catalogRepo.bulkUpdateProducts(ids, update);
  await flushCache(CACHE_KEY);
  return count;
};

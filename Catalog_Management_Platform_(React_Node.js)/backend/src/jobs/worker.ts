import { Worker } from 'bullmq';
import { bulkUpdateCatalog } from '../services/catalogService.js';
import redis from '../utils/redisClient.js';
import logger from '../middleware/logger.js';

const connection = { host: process.env.REDIS_HOST || '127.0.0.1', port: Number(process.env.REDIS_PORT || 6379) };

export const startJobWorkers = async () => {
  const bulkWorker = new Worker(
    'bulk-updates',
    async (job) => {
      logger.info('Processing bulk update job %s', job.id);
      const { ids, update } = job.data as { ids: number[]; update: Record<string, unknown> };
      await bulkUpdateCatalog(ids, update as { price?: number; status?: 'active' | 'inactive'; stock?: number });
      return { success: true };
    },
    { connection }
  );

  bulkWorker.on('completed', (job) => logger.info('Bulk update job completed: %s', job.id));
  bulkWorker.on('failed', (job, err) => logger.error('Bulk update job failed: %s %o', job?.id, err));

  logger.info('Background job workers started');
  return Promise.resolve();
};

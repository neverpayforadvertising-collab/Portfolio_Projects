import { Queue } from 'bullmq';
import redis from '../utils/redisClient.js';

const queueOptions = {
  connection: { host: process.env.REDIS_HOST || '127.0.0.1', port: Number(process.env.REDIS_PORT || 6379) }
};

const bulkQueue = new Queue('bulk-updates', queueOptions);

export const enqueueBulkUpdate = async (payload: { ids: number[]; update: Record<string, unknown> }) => {
  const job = await bulkQueue.add('bulkUpdate', payload, { removeOnComplete: true, removeOnFail: true });
  return job.id;
};

export const createSyncJob = async (payload: Record<string, unknown>) => {
  const syncQueue = new Queue('sync-jobs', queueOptions);
  const job = await syncQueue.add('syncData', payload, { removeOnComplete: true, removeOnFail: true });
  return job.id;
};

export const closeRedisConnection = async () => {
  await redis.quit();
};

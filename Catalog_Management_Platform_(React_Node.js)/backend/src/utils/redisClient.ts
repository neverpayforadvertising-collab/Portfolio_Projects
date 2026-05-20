import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT || 6379)
});

export const getCache = async <T>(key: string): Promise<T | null> => {
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as T) : null;
};

export const setCache = async (key: string, value: unknown, ttlSeconds = 60): Promise<void> => {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
};

export const flushCache = async (key: string): Promise<void> => {
  await redis.del(key);
};

export default redis;

import { ErrorRequestHandler } from 'express';
import logger from './logger.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err?.message ?? 'Unhandled error', { stack: err?.stack });
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || 'Internal server error' });
};

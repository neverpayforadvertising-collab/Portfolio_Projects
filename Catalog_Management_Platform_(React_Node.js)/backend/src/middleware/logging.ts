import { RequestHandler } from 'express';
import logger from './logger.js';

export const logRequests: RequestHandler = (req, _, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

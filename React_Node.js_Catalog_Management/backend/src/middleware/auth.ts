import { RequestHandler } from 'express';

export const validateApiKey: RequestHandler = (req, res, next) => {
  const apiKey = req.header('x-api-key') || req.header('X-Api-Key');
  const expectedKey = process.env.API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

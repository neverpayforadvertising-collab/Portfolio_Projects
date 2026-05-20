import { RequestHandler } from 'express';
import Joi from 'joi';

export const validateSchema = (schema: Joi.Schema, source: 'body' | 'query' = 'body'): RequestHandler => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ error: error.details.map((detail) => detail.message).join(', ') });
    }
    req[source] = value;
    next();
  };
};

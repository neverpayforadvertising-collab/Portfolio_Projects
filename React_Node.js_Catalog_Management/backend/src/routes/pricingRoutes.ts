import { Router } from 'express';
import * as pricingController from '../controllers/pricingController.js';
import { validateSchema } from '../middleware/validation.js';
import { pricingOverrideSchema, pricingSearchSchema } from '../utils/validationSchemas.js';

const router = Router();

router.get('/', validateSchema(pricingSearchSchema, 'query'), pricingController.getPricingRules);
router.post('/override', validateSchema(pricingOverrideSchema), pricingController.overridePricingRule);

export default router;

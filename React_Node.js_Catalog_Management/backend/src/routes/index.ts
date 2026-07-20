import { Router } from 'express';
import catalogRoutes from './catalogRoutes.js';
import pricingRoutes from './pricingRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';

const router = Router();

router.use('/catalog', catalogRoutes);
router.use('/pricing', pricingRoutes);
router.use('/inventory', inventoryRoutes);

// CHANGED: the GET /health route was removed from here and relocated to app.ts
// so it is registered before the API-key middleware (public health probe).

export default router;

import { Router } from 'express';
import catalogRoutes from './catalogRoutes.js';
import pricingRoutes from './pricingRoutes.js';
import inventoryRoutes from './inventoryRoutes.js';

const router = Router();

router.use('/catalog', catalogRoutes);
router.use('/pricing', pricingRoutes);
router.use('/inventory', inventoryRoutes);

router.get('/health', (_, res) => res.status(200).json({ status: 'ok' }));

export default router;

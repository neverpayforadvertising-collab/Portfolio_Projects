import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController.js';
import { validateSchema } from '../middleware/validation.js';
import { inventoryUpdateSchema, inventorySearchSchema } from '../utils/validationSchemas.js';

const router = Router();

router.get('/', validateSchema(inventorySearchSchema, 'query'), inventoryController.getInventory);
router.post('/update', validateSchema(inventoryUpdateSchema), inventoryController.updateInventory);

export default router;

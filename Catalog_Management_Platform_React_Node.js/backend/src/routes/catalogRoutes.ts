import { Router } from 'express';
import * as catalogController from '../controllers/catalogController.js';
import { validateSchema } from '../middleware/validation.js';
import { productCreateSchema, productSearchSchema, bulkUpdateSchema } from '../utils/validationSchemas.js';

const router = Router();

router.get('/', validateSchema(productSearchSchema, 'query'), catalogController.getProducts);
router.get('/:id', catalogController.getProductById);
router.post('/', validateSchema(productCreateSchema), catalogController.createOrUpdateProduct);
router.post('/bulk-update', validateSchema(bulkUpdateSchema), catalogController.bulkUpdateCatalog);

export default router;

import { Router } from 'express';
import { getAllProducts } from '../controllers/product.controllers.js';
import { createProduct } from '../controllers/product.controllers.js';
const router = Router();

router.post('/create', createProduct);
router.get('/getAll', getAllProducts);
export default router;

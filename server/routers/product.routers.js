import { Router } from 'express';
import { isAuthenticated } from '../controllers/middleware.controllers.js';
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.controllers.js';
import { createProduct } from '../controllers/product.controllers.js';
const router = Router();

router.get('/getAll', getAllProducts);
router.get('/getProductById/:id', getProductById);
router.use(isAuthenticated);
router.post('/create', createProduct);
router.patch('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
export default router;

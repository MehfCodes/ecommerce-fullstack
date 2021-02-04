import { Router } from "express";
import { getAllProducts } from "../controllers/product.controllers.mjs";
import { createProduct } from "../controllers/product.controllers.mjs";
const router = Router();

router.post("/create", createProduct);
router.get("/getAll", getAllProducts);
export default router;

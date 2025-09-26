import { Router } from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct);

// admin routes
router.put("/:id", authMiddleware, authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, authMiddleware, deleteProduct);

export default router;

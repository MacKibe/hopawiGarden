import { Router } from "express";
import { getProducts, addProduct, getProductById } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, addProduct);

export default router;

import { Router } from "express";
import { getProducts, addProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/", authMiddleware, addProduct);

export default router;

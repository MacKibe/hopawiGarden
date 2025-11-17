import { Router } from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsByGroupName, getProductsGroupedByName, getProductImages, addProductImage, deleteProductImage} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Debug middleware to log all product routes
router.use((req, res, next) => {
  console.log(`Product Route: ${req.method} ${req.path}`);
  next();
});

// Public routes
router.get("/grouped", getProductsGroupedByName);
router.get("/group/:groupName", getProductsByGroupName);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct);

// Image routes
router.get("/:productId/images", getProductImages);
router.post("/:productId/images", authMiddleware, addProductImage);
router.delete("/images/:imageId", authMiddleware, deleteProductImage);

// admin routes
router.put("/:product_id", authMiddleware, updateProduct);
router.delete("/:product_id", authMiddleware, deleteProduct);

export default router;

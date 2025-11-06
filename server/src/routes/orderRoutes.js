import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = Router();

// Public routes
router.post("/", createOrder);
router.get("/user/:email", getUserOrders);

export default router;
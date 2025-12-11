import { Router } from "express";
import { handleMpesaCallback } from "../controllers/mpesaController.js";

const router = Router();

router.post("/", handleMpesaCallback);

export default router;
import { Router } from "express";
import { initiateStkPush } from "../controllers/mpesaController.js";

const router = Router();

router.post("/", initiateStkPush);

export default router;
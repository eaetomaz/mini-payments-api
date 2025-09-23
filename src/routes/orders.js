import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOrder, getMyOrder, getAllOrders , payOrder } from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/me", authMiddleware, getMyOrder);
router.get("/", authMiddleware, getAllOrders);
router.post("/pay/:id", payOrder)

export default router;
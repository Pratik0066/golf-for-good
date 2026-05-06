// backend/routes/stripeRoutes.js
import express from "express";
import { createCheckoutSession, confirmPayment } from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PRD Section 04: Subscription session initialization[cite: 17, 18]
router.post("/create-checkout-session", protect, createCheckoutSession); 
router.post("/confirm", protect, confirmPayment);

export default router;
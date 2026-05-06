import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboard, getWalletData } from "../controllers/dashboardController.js";

const router = express.Router();

// PRD Section 10: General user summary
router.get("/stats", protect, getDashboard);

// PRD Section 10: Wallet and impact summary
router.get("/wallet", protect, getWalletData);

export default router;
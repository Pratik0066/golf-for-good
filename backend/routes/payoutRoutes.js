import express from "express";
import { protect,adminOnly} from "../middleware/authMiddleware.js";
import { getMyPayouts, getAllPayouts, finalizePayout} from "../controllers/payoutController.js";

const router = express.Router();

/**
 * @desc    Get current user's payout history
 * @route   GET /api/payouts/my-history
 * @access  Private (Registered Subscriber)
 * 
 * PRD Alignment: Section 11 - Payouts Management.
 * Allows users to see if their winnings are Pending or Paid.
 */
router.get("/my-history", protect, getMyPayouts);

router.get("/", protect, adminOnly, getAllPayouts);
router.put("/:payoutId", protect, adminOnly, finalizePayout);

export default router;
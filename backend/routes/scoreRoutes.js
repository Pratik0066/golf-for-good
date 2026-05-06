import express from "express";
import { addScore, getMyScores } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

/**
 * PRD Section 05: Score Management
 * GET: Fetch user's rolling 5 scores
 * POST: Upload scorecard and add score (Subscription Required)[cite: 16, 22]
 */
router.route("/")
  .get(protect, getMyScores)
  .post(protect, upload.single("image"), addScore);

export default router;
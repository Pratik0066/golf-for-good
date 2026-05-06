// routes/winnerRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { uploadWinProof } from "../controllers/winnerController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// PRD Section 09: Winner uploads proof of scores
router.post("/upload-proof/:winnerId", protect, upload.single("image"), uploadWinProof);

export default router;

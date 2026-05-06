import express from "express";
import { runDraw, latestDraw,getDrawHistory } from "../controllers/drawController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// PRD Section 06: Admin-only draw execution
router.post("/execute-draw", protect, adminOnly, runDraw);

// PRD Section 06: Public latest draw results
router.get("/latest", latestDraw);


// Add this line to handle the TournamentHistory.jsx request
router.get("/history", protect, getDrawHistory); 



export default router;
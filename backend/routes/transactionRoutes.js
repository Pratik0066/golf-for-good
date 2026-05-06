import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const txns = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(txns);
});
export default router;
// backend/routes/drawRoutes.js
import express from 'express';
import { runDraw, latestDraw, getDrawHistory } from '../controllers/drawController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/draw/execute
// @desc    Run simulation or publish official draw
// @access  Private/Admin Only
router.post('/execute', protect, adminOnly, runDraw);

// @route   GET /api/draw/latest
// @desc    Get the most recently published draw
// @access  Private (All subscribed users can view)
router.get('/latest', protect, latestDraw);

// @route   GET /api/draw/history
// @desc    Get all past published draws
// @access  Private
router.get('/history', protect, getDrawHistory);

export default router;
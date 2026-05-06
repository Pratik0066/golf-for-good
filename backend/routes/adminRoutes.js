import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { 
  getAdminStats, 
  getPendingScores, 
  verifyScore, 
  getUsers,
  getCharityPartners,
  getConfig,
  updateConfig,
 
  
} from "../controllers/adminController.js";
import { getWinnersForReview } from "../controllers/winnerController.js";
import { finalizePayout } from "../controllers/payoutController.js";
import Charity from "../models/Charity.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure storage logic
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/charities/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Dashboard & User Management
router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/users", protect, adminOnly, getUsers);

router.put("/users/:id/role", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id); // Requires User model import
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();
    res.json({ message: "User role updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error during role update", error: error.message });
  }
});

/**
 * DELETE USER
 * Matches frontend: DELETE /api/admin/users/:id
 */
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Requires User model import[cite: 26]
    if (!user) return res.status(404).json({ message: "User not found" });

    // Safety check: Don't delete yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own admin account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error during user deletion", error: error.message });
  }
});


// Score Verification Queue
router.get("/pending-scores", protect, adminOnly, getPendingScores);
router.put("/verify-score/:id", protect, adminOnly, verifyScore);

// Winners & Payouts (PRD Section 09 & 11)
router.get("/winners-review", protect, adminOnly, getWinnersForReview);
router.put("/payout/:payoutId", protect, adminOnly, finalizePayout);

// Platform Configuration
router.get("/charity-partners", protect, adminOnly, getCharityPartners);
router.get("/config", protect, adminOnly, getConfig);
router.put("/config", protect, adminOnly, updateConfig);



/**
 * CHARITY MANAGEMENT ROUTES
 * Matches frontend: GET /api/admin/charity-partners
 */
router.get("/charity-partners", protect, adminOnly, getCharityPartners);

// PRD Section 11: Route for deleting a partner
router.delete("/charity-partners/:id", protect, adminOnly, async (req, res) => {
  try {
    await Charity.findByIdAndDelete(req.params.id);
    res.json({ message: "Partner removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
});


/**
 * UPDATED POST ROUTE with Image Upload
 */
router.post("/charity-partners", protect, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { name, website, description } = req.body;
    const imagePath = req.file ? `/uploads/charities/${req.file.filename}` : "";

    const charity = await Charity.create({
      name,
      website,
      description,
      image: imagePath, // Save the path to the database
      totalDonated: 0
    });

    res.status(201).json(charity);
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

export default router;
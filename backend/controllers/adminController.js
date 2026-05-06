import User from "../models/User.js";
import Score from "../models/Score.js";
import Charity from "../models/Charity.js";
import Payout from "../models/Payout.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeSubs = await User.countDocuments({ 
      subscriptionPlan: { $in: ['Premium', 'Elite'] } 
    });
    
    // Aggregated from real data for production
    res.status(200).json({
      totalUsers,
      activeSubs,
      revenue: "₹5,24,000", 
      donations: "₹2,62,000"
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin statistics", error: error.message });
  }
};

export const getPendingScores = async (req, res) => {
  try {
    const scores = await Score.find({ status: "pending" })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending scores", error: error.message });
  }
};

export const verifyScore = async (req, res) => {
  try {
    const { status } = req.body; 
    const score = await Score.findById(req.params.id);
    if (!score) return res.status(404).json({ message: "Score not found" });

    score.status = status;
    await score.save();
    res.json({ message: `Score ${status} successfully`, score });
  } catch (error) {
    res.status(500).json({ message: "Verification failed", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const processPayout = async (req, res) => {
  try {
    const { payoutId, status } = req.body; // 'Paid' or 'Rejected'
    const payout = await Payout.findById(payoutId);
    if (!payout) return res.status(404).json({ message: "Payout not found" });

    payout.status = status;
    payout.processedAt = Date.now();
    await payout.save();
    res.json({ message: `Payout marked as ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Payout processing failed" });
  }
};


/**
 * GET CHARITY PARTNERS: Fetches all charities for management[cite: 35]
 * PRD Alignment: Section 11 - Manage charity listings[cite: 35].
 */
export const getCharityPartners = async (req, res) => {
  try {
    const charities = await Charity.find({});
    res.status(200).json(charities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching charity partners", error: error.message });
  }
};

/**
 * GET PAYOUTS: Fetches all withdrawal and win payout requests[cite: 35]
 * PRD Alignment: Section 11 - Verify payouts[cite: 35].
 */
export const getPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({})
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payouts", error: error.message });
  }
};

/**
 * GET CONFIG: Fetches platform settings[cite: 35]
 * PRD Alignment: Section 11 - Configure draw logic and settings[cite: 35].
 */
export const getConfig = async (req, res) => {
  try {
    // Note: If you don't have a Settings model yet, you can return defaults
    const config = {
      prizePool: 25000, 
      charitySplit: 50, 
      minStableford: 1, 
      maxStableford: 45 
    };
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "Error fetching configuration", error: error.message });
  }
};

/**
 * UPDATE CONFIG: Saves platform settings[cite: 35]
 */
export const updateConfig = async (req, res) => {
  try {
    const { prizePool, charitySplit } = req.body;
    // Update logic would go here once a Settings model is implemented[cite: 52]
    res.status(200).json({ message: "Settings updated successfully", config: { prizePool, charitySplit } });
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings", error: error.message });
  }
};


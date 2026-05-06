import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Score from "../models/Score.js";

/**
 * GET WALLET DATA
 * PRD Alignment: Section 10 - Winnings overview, total won, and payment status.
 */
export const getWalletData = async (req, res) => {
  try {
    // 1. Validate User Context
    // req.user is populated by the 'protect' middleware.
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized to access wallet data" }); 
    }

    // 2. Fetch Transaction Ledger
    // Retrieves the 10 most recent financial activities (winnings, withdrawals, subscriptions).
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    // 3. Construct Unified Response
    // Provides default values of 0 if fields are uninitialized in the User model.
    res.json({
      balance: req.user.walletBalance || 0,
      pending: req.user.pendingWinnings || 0, // PRD: Current payment status[cite: 52]
      charityImpact: req.user.charityDonated || 0, // PRD: Selected charity contribution[cite: 52]
      transactions: transactions || []
    });
  } catch (error) {
    console.error("🔥 WALLET SYNC ERROR:", error);
    res.status(500).json({ 
      message: "Internal Server Error during wallet synchronization", 
      error: error.message 
    });
  }
};

/**
 * GET DASHBOARD STATS
 * PRD Alignment: Section 10 - Subscription status and participation summary[cite: 52].
 */
export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('selectedCharity');
    const scores = await Score.find({ userId: req.user.id }).sort({ date: -1 });

    res.json({
      subscription: {
        plan: user.subscriptionPlan,
        status: user.subscriptionStatus // PRD 04: Renewal/Lapsed states[cite: 52]
      },
      rollingFive: scores, // PRD 05: Latest 5 scores retained[cite: 52]
      charity: {
        name: user.selectedCharity?.name,
        contribution: user.charityPercentage // PRD 08: 10% Minimum[cite: 52]
      },
      winnings: {
        total: user.walletBalance,
        impact: user.charityDonated
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard synchronization failed" });
  }
};
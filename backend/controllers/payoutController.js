import Payout from "../models/Payout.js";
import Winner from "../models/Winner.js";
import User from "../models/User.js";

// @desc    Admin marks a payout as completed
export const finalizePayout = async (req, res) => {
  try {
    const { payoutId } = req.params;
    const { status, adminNote } = req.body; // 'Paid' or 'Rejected'

    const payout = await Payout.findById(payoutId).populate('userId');
    if (!payout) return res.status(404).json({ message: "Payout record not found" });

    payout.status = status;
    payout.adminNote = adminNote;
    payout.processedAt = Date.now();
    await payout.save();

    // If paid, update the user's wallet balance for withdrawal
    if (status === 'Paid') {
      const user = await User.findById(payout.userId._id);
      user.walletBalance += payout.amount;
      await user.save();
    }

    res.json({ message: `Payout marked as ${status}`, payout });
  } catch (error) {
    res.status(500).json({ message: "Payout update failed" });
  }
};

// @desc    User views their own payout history
export const getMyPayouts = async (req, res) => {
  try {
    const history = await Payout.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "History sync failed" });
  }
};


export const getAllPayouts = async (req, res) => {
  try {
    // Finds all records and includes user details like email
    const payouts = await Payout.find().populate('userId', 'email').sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payouts" });
  }
};
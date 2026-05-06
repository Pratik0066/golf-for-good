import Score from "../models/Score.js";
import User from "../models/User.js"; // Needed to check subscription status

export const addScore = async (req, res) => {
  try {
    // PRD Section 04/05: Check for active subscription before allowing post
    const user = await User.findById(req.user._id);
    if (!user || !user.isSubscribed) {
      return res.status(403).json({ 
        message: "Premium Feature: An active subscription is required to post scores." 
      });
    }

    const { stablefordValue, date } = req.body;
    const proofImage = req.file?.path; 

    if (!proofImage) return res.status(400).json({ message: "Photo proof required" });

    // PRD 10: Check for duplicate date
    const existingDate = await Score.findOne({ userId: req.user._id, date });
    if (existingDate) return res.status(400).json({ message: "Score for this date already exists" });

    const newScore = await Score.create({
      userId: req.user._id,
      stablefordValue,
      date,
      proofImage,
      status: 'pending' // PRD Section 09: Requires admin verification
    });

    // PRD 05: Rolling 5 Logic - Keep only the 5 most recent scores[cite: 21]
    const userScores = await Score.find({ userId: req.user._id }).sort({ date: -1 });
    if (userScores.length > 5) {
      const idsToDelete = userScores.slice(5).map(s => s._id);
      await Score.deleteMany({ _id: { $in: idsToDelete } });
    }

    const currentRollingFive = await Score.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(201).json(currentRollingFive);
  } catch (error) {
    res.status(500).json({ message: "Submission failed", error: error.message });
  }
};

export const getMyScores = async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
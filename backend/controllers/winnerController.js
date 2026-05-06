import Winner from "../models/Winner.js";
import Draw from "../models/Draw.js";

// @desc    User uploads proof for a specific win
export const uploadWinProof = async (req, res) => {
  try {
    const { winnerId } = req.params;
    const proofImage = req.file?.path;

    if (!proofImage) return res.status(400).json({ message: "Proof image is mandatory" });

    const winner = await Winner.findOne({ _id: winnerId, userId: req.user._id });
    if (!winner) return res.status(404).json({ message: "Winner record not found" });

    winner.proofImage = proofImage;
    winner.verificationStatus = 'pending';
    await winner.save();

    res.json({ message: "Proof submitted for admin review", winner });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// @desc    Admin fetches all winners needing verification
export const getWinnersForReview = async (req, res) => {
  try {
    const winners = await Winner.find({ verificationStatus: 'pending' })
      .populate('userId', 'name email')
      .populate('drawId', 'drawDate');
    res.json(winners);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
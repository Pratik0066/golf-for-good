import Draw from "../models/Draw.js";
import User from "../models/User.js";
import Winner from "../models/Winner.js";

export const runDraw = async (req, res) => {
  try {
    const { mode = 'random', isSimulation = false, totalPrizePool = 1000 } = req.body;
    let nums = [];

    // PRD Range: 1-45
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    nums.sort((a, b) => a - b);

    // PRD 07: Tiered Distribution
    const tierPrizes = {
      fiveMatch: totalPrizePool * 0.40,
      fourMatch: totalPrizePool * 0.35,
      threeMatch: totalPrizePool * 0.25
    };

    const draw = await Draw.create({
      winningNumbers: nums,
      prizePoolTotal: totalPrizePool,
      tierPrizes,
      mode,
      status: isSimulation ? 'simulated' : 'published'
    });

    res.status(201).json(draw);
  } catch (err) {
    res.status(500).json({ message: "Draw failed", error: err.message });
  }
};

export const latestDraw = async (req, res) => {
  const draw = await Draw.findOne({ status: 'published' }).sort({ createdAt: -1 });
  res.json(draw);
};

// backend/controllers/drawController.js
export const getDrawHistory = async (req, res) => {
  try {
    // Fetches draws with 'published' status, sorted by newest first
    const history = await Draw.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
};
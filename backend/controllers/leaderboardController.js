import Score from "../models/Score.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      { $match: { status: "approved" } }, 
      { $sort: { userId: 1, date: -1 } }, 
      {
        $group: {
          _id: "$userId",
          latestScores: { $push: "$stablefordValue" },
        }
      },
      { $project: { rollingFive: { $slice: ["$latestScores", 5] } } },
      { $project: { avgStableford: { $avg: "$rollingFive" } } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      { $sort: { avgStableford: -1 } },
      { $limit: 10 }
    ]);

    res.json(leaderboard.map(item => ({
      name: item.userDetails.name,
      avgStableford: item.avgStableford.toFixed(1),
      winnings: item.userDetails.walletBalance,
      tier: item.userDetails.subscriptionPlan
    })));
  } catch (error) {
    res.status(500).json({ message: "Leaderboard calculation failed" });
  }
};
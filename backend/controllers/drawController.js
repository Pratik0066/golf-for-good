// backend/controllers/drawController.js
import lodash from 'lodash';
const { intersection } = lodash;

import { sendEmail } from '../utils/sendEmail.js';
import Draw from "../models/Draw.js";
import User from "../models/User.js";
import Winner from "../models/Winner.js";
import Score from "../models/Score.js";
import DrawState from "../models/DrawState.js";

export const runDraw = async (req, res) => {
  try {
    const { mode = 'random', isSimulation = false } = req.body;

    // 1. Calculate Dynamic Prize Pool (Assumes 20% of sub revenue funds the pool)
    const premiumUsers = await User.find({ isSubscribed: true });
    const currentMonthRevenue = premiumUsers.reduce((total, user) => {
      return total + (user.subscriptionPlan === 'Elite' ? 1499 : 599);
    }, 0);
    const generatedPool = currentMonthRevenue * 0.20; 

    // 2. Fetch or Create DrawState for the Jackpot Rollover 
    let drawState = await DrawState.findOne();
    if (!drawState) drawState = await DrawState.create({ currentRollover: 0 });

    // 3. Pool Distribution (PRD 40/35/25 Split) 
    const tier1Pool = (generatedPool * 0.40) + drawState.currentRollover; // 5-Match + Rollover
    const tier2Pool = generatedPool * 0.35; // 4-Match
    const tier3Pool = generatedPool * 0.25; // 3-Match

    // 4. Generate 5 Winning Numbers (1-45)
    let nums = [];
    while (nums.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    nums.sort((a, b) => a - b);

    // 5. Evaluate Users (The "Rolling 5" Match) [cite: 45]
    const tier1Winners = [];
    const tier2Winners = [];
    const tier3Winners = [];

    for (const user of premiumUsers) {
      // Get user's last 5 approved scores
      const recentScores = await Score.find({ userId: user._id, status: 'approved' })
        .sort({ date: -1 })
        .limit(5); 

      // Only evaluate users who have completed their Rolling 5
      if (recentScores.length === 5) {
        const userNumbers = recentScores.map(s => s.stablefordValue);
        const matchedNumbers = intersection(nums, userNumbers);
        const matchCount = matchedNumbers.length;

        // Elite users get 2x probability/shares (added to array twice)
        const isElite = user.subscriptionPlan === 'Elite';
        const shares = isElite ? 2 : 1;

        if (matchCount === 5) {
          for(let i=0; i<shares; i++) tier1Winners.push(user);
        } else if (matchCount === 4) {
          for(let i=0; i<shares; i++) tier2Winners.push(user);
        } else if (matchCount === 3) {
          for(let i=0; i<shares; i++) tier3Winners.push(user);
        }
      }
    }

    // 6. Calculate Payouts per Share
    let newRollover = 0;
    let tier1PayoutEach = 0;
    let tier2PayoutEach = tier2Winners.length > 0 ? tier2Pool / tier2Winners.length : 0;
    let tier3PayoutEach = tier3Winners.length > 0 ? tier3Pool / tier3Winners.length : 0;

    if (tier1Winners.length > 0) {
      tier1PayoutEach = tier1Pool / tier1Winners.length;
    } else {
      newRollover = tier1Pool; // No 5-match winners, Jackpot carries forward 
    }

    // 7. Execute Database Updates ONLY if not simulating 
    let drawRecord;
    if (!isSimulation) {
      // Update Rollover State
      drawState.currentRollover = newRollover;
      drawState.lastDrawDate = new Date();
      await drawState.save();

      // Save the Draw History
      drawRecord = await Draw.create({
        winningNumbers: nums,
        prizePoolTotal: generatedPool + drawState.currentRollover,
        tierPrizes: {
          fiveMatch: tier1Pool,
          fourMatch: tier2Pool,
          threeMatch: tier3Pool
        },
        mode,
        status: 'published'
      });

      const saveWinnersAndPay = async (winnersList, tier, payoutPerShare) => {
        const uniqueUsers = [...new Set(winnersList.map(u => u._id.toString()))];
        
        for (const userId of uniqueUsers) {
           const user = await User.findById(userId); // Fetch user to get email and name
           const userShares = winnersList.filter(u => u._id.toString() === userId).length;
           const totalUserPayout = payoutPerShare * userShares;

           await Winner.create({
             userId,
             drawId: drawRecord._id,
             tier,
             prizeAmount: totalUserPayout,
             drawDate: new Date()
           });

           await User.findByIdAndUpdate(userId, { $inc: { walletBalance: totalUserPayout } });

           // --- NEW: Trigger Email Alert [cite: 127] ---
           const emailTemplate = `
             <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
               <h2 style="color: #84cc16; font-style: italic;">Congratulations, ${user.name}!</h2>
               <p>The official GolfForGood monthly draw has concluded, and your verified scores matched the winning numbers.</p>
               <h3 style="background: #161B22; color: white; padding: 15px; border-radius: 8px;">
                 You won: ₹${totalUserPayout.toFixed(2)} (${tier})
               </h3>
               <p>Your digital wallet has been credited. Thank you for turning your passion into purpose and supporting underprivileged youth!</p>
               <br/>
               <p style="font-size: 12px; color: #6b7280;">- The GolfForGood Team</p>
             </div>
           `;

           await sendEmail({
             email: user.email,
             subject: '🏆 You Won the GolfForGood Monthly Draw!',
             html: emailTemplate
           });
        }
      };

         

      // Process Payouts
      if (tier1Winners.length > 0) await saveWinnersAndPay(tier1Winners, 'Tier 1', tier1PayoutEach);
      if (tier2Winners.length > 0) await saveWinnersAndPay(tier2Winners, 'Tier 2', tier2PayoutEach);
      if (tier3Winners.length > 0) await saveWinnersAndPay(tier3Winners, 'Tier 3', tier3PayoutEach);
    }

    // 8. Return Report (Used by Admin Dashboard)
    res.status(201).json({
      mode: isSimulation ? "SIMULATION" : "OFFICIAL PUBLISHED DRAW",
      winningNumbers: nums,
      financials: {
        totalGeneratedPool: generatedPool,
        previousRollover: drawState.currentRollover - newRollover, // Amount from last month
        newRolloverAmount: newRollover, // Amount moving to next month
      },
      results: {
        tier1_5Match: { count: tier1Winners.length, payoutEach: tier1PayoutEach },
        tier2_4Match: { count: tier2Winners.length, payoutEach: tier2PayoutEach },
        tier3_3Match: { count: tier3Winners.length, payoutEach: tier3PayoutEach },
      },
      drawRecord: drawRecord || "Not saved (Simulation)"
    });

  } catch (err) {
    res.status(500).json({ message: "Draw failed", error: err.message });
  }
};

export const latestDraw = async (req, res) => {
  try {
    const draw = await Draw.findOne({ status: 'published' }).sort({ createdAt: -1 });
    res.json(draw);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch latest draw", error: err.message });
  }
};

export const getDrawHistory = async (req, res) => {
  try {
    const history = await Draw.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
};
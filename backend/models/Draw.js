import mongoose from 'mongoose';

const drawSchema = new mongoose.Schema({
  winningNumbers: { 
    type: [Number], 
    validate: [val => val.length === 5, 'Must be 5 numbers'] // PRD 06[cite: 52]
  },
  prizePoolTotal: { type: Number, default: 0 },
  // PRD 07: Tiered Distribution[cite: 52]
  tierPrizes: {
    fiveMatch: { type: Number, default: 0 }, // 40%
    fourMatch: { type: Number, default: 0 }, // 35%
    threeMatch: { type: Number, default: 0 } // 25%
  },
  mode: { type: String, enum: ['random', 'algorithmic'], default: 'random' },
  status: { type: String, enum: ['simulated', 'published'], default: 'simulated' },
  isJackpotRolledOver: { type: Boolean, default: false }, // PRD 07: Jackpot logic[cite: 52]
  drawDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Draw', drawSchema);
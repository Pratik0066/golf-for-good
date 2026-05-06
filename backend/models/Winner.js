import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drawId: { type: mongoose.Schema.Types.ObjectId, ref: 'Draw', required: true },
  matchTier: { type: Number, enum: [3, 4, 5], required: true }, // PRD 07: 3, 4, or 5 match tiers
  prizeWon: { type: Number, required: true },
  proofImage: { type: String }, // PRD 09: Screenshot of scores from golf platform
  verificationStatus: { 
    type: String, 
    enum: ['unsubmitted', 'pending', 'verified', 'rejected'], 
    default: 'unsubmitted' 
  },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin ID
}, { timestamps: true });

export default mongoose.model('Winner', winnerSchema);
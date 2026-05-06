import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stablefordValue: { type: Number, required: true, min: 1, max: 45 }, // PRD 05
  date: { type: Date, required: true }, 
  proofImage: { type: String, required: true }, // Mandatory for verification
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

// PRD 10: Only one score entry permitted per date per user
scoreSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('Score', scoreSchema);
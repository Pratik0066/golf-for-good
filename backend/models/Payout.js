import mongoose from 'mongoose';

const payoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  drawId: { type: mongoose.Schema.Types.ObjectId, ref: 'Draw', required: true },
  amount: { type: Number, required: true },
  method: { type: String, default: 'Bank Transfer' },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Paid', 'Rejected'], 
    default: 'Pending' 
  },
  adminNote: String,
  processedAt: Date
}, { timestamps: true });

export default mongoose.model('Payout', payoutSchema);
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  subscriptionPlan: { type: String, enum: ['Basic', 'Premium', 'Elite'], default: 'Basic' },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'lapsed'], default: 'inactive' }, // PRD 04
  walletBalance: { type: Number, default: 0 },
  charityDonated: { type: Number, default: 0 },
  selectedCharity: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' }, // PRD 08
  charityPercentage: { type: Number, default: 10, min: 10 } // PRD 08: Minimum 10%
}, { timestamps: true });

export default mongoose.model('User', userSchema);
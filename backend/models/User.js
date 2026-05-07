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
  selectedCharity: { 
    type: String, 
    default: "GolfForGood General Education Fund" 
  },
  charityPercentage: { 
    type: Number, 
    required: true,
    min: [10, 'Minimum contribution is 10%'], 
    max: [100, 'Maximum contribution is 100%'],
    default: 10 
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
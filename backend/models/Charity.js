import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: String,
  description: String,
  category: { type: String, enum: ['Education', 'Healthcare', 'Nutrition', 'General'] }, // PRD 08[cite: 52]
  image: String,
  totalDonated: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false } // PRD 08: Featured section[cite: 52]
});

export default mongoose.model("Charity", charitySchema);
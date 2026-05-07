// backend/models/DrawState.js
import mongoose from 'mongoose';

const drawStateSchema = new mongoose.Schema({
  currentRollover: {
    type: Number,
    default: 0
  },
  lastDrawDate: {
    type: Date,
    default: null
  }
});

export default mongoose.model('DrawState', drawStateSchema);
import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  providerID: { type: String, unique: true, required: true },
  providerName: { type: String, required: true },
  timeLimit: { type: Number, required: true }, // Time limit in minutes/hours
});

export default mongoose.model('Provider', providerSchema);

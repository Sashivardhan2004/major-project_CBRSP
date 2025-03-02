import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  consumerID: { type: String, required: true },
  providerID: { type: String, required: true, ref: 'Provider' },
  containerId: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  containerStartTime: { type: Date, default: Date.now },
  containerEndTime: { type: Date, default: null },
});

export default mongoose.model('Log', logSchema);

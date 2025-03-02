import express from 'express';
import Log from '../models/log.js';
import Provider from '../models/provider.js';

const router = express.Router();

// Create Log Entry
router.post('/', async (req, res) => {
  try {
    const { consumerID, providerID, containerId, image } = req.body;

    // Check if provider exists
    const providerExists = await Provider.findOne({ providerID });
    if (!providerExists) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // ✅ Prevent duplicate log entries for the same containerId
    const existingLog = await Log.findOne({ containerId });
    if (existingLog) {
      return res
        .status(400)
        .json({ message: 'Log with this containerId already exists' });
    }

    const newLog = new Log({ consumerID, providerID, containerId, image });
    await newLog.save();

    res.status(201).json({
      message: 'Log created successfully',
      log: newLog, // ✅ Include created log in response
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Logs
router.get('/', async (req, res) => {
  try {
    // ✅ Fixed population reference to correctly fetch provider details
    const logs = await Log.find().populate(
      'providerID',
      'providerName providerID'
    );

    res.json({ logs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

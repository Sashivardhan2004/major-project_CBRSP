import express from 'express';
import Provider from '../models/provider.js';
import {
  getBatteryStatus,
  getSystemInfo,
} from '../controllers/providerController.js'; // ✅ Import the function

const router = express.Router();

// Create Provider
router.post('/', async (req, res) => {
  try {
    const { providerID, providerName, timeLimit } = req.body;

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ providerID });
    if (existingProvider) {
      return res.status(400).json({ message: 'Provider already exists' });
    }

    const newProvider = new Provider({ providerID, providerName, timeLimit });
    await newProvider.save();

    res.status(201).json({
      message: 'Provider added successfully',
      provider: newProvider, // ✅ Include created provider in response
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json({ providers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get battery percentage
router.get('/battery', getBatteryStatus);
// Route to get RAM & Storage Info Route
router.get('/system-info', getSystemInfo);
export default router;

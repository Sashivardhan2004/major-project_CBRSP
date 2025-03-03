import si from 'systeminformation';

// Get Battery percentage details
export async function getBatteryStatus(req, res) {
  try {
    const batteryInfo = await si.battery();
    res.json({ batteryPercentage: batteryInfo.percent });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving battery info', error: error.message });
  }
}

// Get RAM and Storage details
export async function getSystemInfo(req, res) {
  try {
    const memory = await si.mem();
    const disk = await si.fsSize();

    res.json({
      totalRAM: memory.total / (1024 * 1024 * 1024), // Convert to GB
      freeRAM: memory.free / (1024 * 1024 * 1024), // Convert to GB
      totalStorage: disk[0].size / (1024 * 1024 * 1024), // Convert to GB
      freeStorage: disk[0].available / (1024 * 1024 * 1024), // Convert to GB
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving system info', error: error.message });
  }
}

import express, { json } from 'express';
import expressWs from 'express-ws';
import session from 'express-session';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dockerRoutes from './routes/dockerRoutes.js';
import logRoutes from './routes/logRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
expressWs(app); // Enable WebSockets

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/docker', dockerRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/providers', providerRoutes);

// WebSocket support (if needed for real-time battery updates)
app.ws('/api/providers/battery', (ws, req) => {
  ws.send(JSON.stringify({ message: 'Battery WebSocket connected!' }));

  setInterval(async () => {
    try {
      const battery = await import('node-powertools');
      const batteryInfo = await battery.getBattery();
      ws.send(JSON.stringify({ batteryPercentage: batteryInfo.percent }));
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Error retrieving battery info' }));
    }
  }, 5000); // Send updates every 5 seconds
});

export default app;

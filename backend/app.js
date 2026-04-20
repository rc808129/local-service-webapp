
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';



dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://127.0.0.1:5174',
    'https://local-service-webapp.vercel.app'

  ],
  methods: ['GET', 'POST', 'PUT',
    'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Routes
import userRoutes from './routes/users.js';
app.use('/api/users', userRoutes);

import profileRoutes from './routes/profiles.js';
app.use('/api/profiles', profileRoutes);

import requestRoutes from './routes/requests.js';

app.get("/raj", (req, res) => {
  res.json({ message: "API working" });
});
app.use('/api/requests', requestRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

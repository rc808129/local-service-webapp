import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

const app = express();

console.log("Mongo URI:", process.env.MONGO_URI);



app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));


import userRoutes from '../routes/users.js'
app.use('/api/users', userRoutes);
import profileRoutes from '../routes/profiles.js'

app.use('/api/profiles', profileRoutes);

import requestRoutes from '../routes/requests.js'


app.get("/raj", (req, res) => {
  res.json({ message: "API working" });
});

app.use('/api/requests', requestRoutes);



app.get("/", (req, res) => {
  res.send("Backend working");
});

 const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));



export default app;
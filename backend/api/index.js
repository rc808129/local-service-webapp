import dotenv from 'dotenv';
dotenv.config();
import express from "express";

import mongoose from 'mongoose';
import cors from 'cors';




const app = express();

console.log("Mongo URI:", process.env.MONGO_URI);




app.use(cors({
  origin: [
    "http://localhost:5173",           // Vite default
    "http://localhost:5000",
    "https://local-service-webapp-2odc.vercel.app/",
    "https://local-service-webapp.vercel.app/", // production mein daal dena
  ],

  credentials: true,          // agar cookies/token bhejna hai toh
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));


import userRoutes from '../routes/users.js'
app.use('/api/users', userRoutes);
// import profileRoutes from '../routes/profiles.js'
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
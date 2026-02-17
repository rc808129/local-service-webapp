import express from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.js";


const router = express.Router();  // 👈 यही userRoutes है



// साइनअप रूट
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: 'All fields required' });
  if (!validator.isEmail(email)) return res.status(400).json({ msg: 'Invalid email' });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign(
  {
    id: user._id,
    name: user.name,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    console.error("SIGNUP ERROR 👉", err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

   const token = jwt.sign(
  {
    id: user._id,
    name: user.name,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;

import express from "express";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/User.js";


const router = express.Router();  



// User is a model
router.post('/signup', async (req, res) => {
  const { name, email, password, city } = req.body;
  if (!name || !email || !password || !city) return res.status(400).json({ msg: 'All fields required' });
  if (!validator.isEmail(email)) return res.status(400).json({ msg: 'Invalid email' });

//   Login → Authentication
// Token se protected route access → Authorization
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password, city });
    await user.save();

    console.log(user._id, user.name, user.city)

    const token = jwt.sign(
  {
    id: user._id,
    name: user.name,
    city: user.city
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// jwt.sign(payload, secretKey, options)

    res.json({ token, user: { id: user._id, name, email, city } });
  } catch (err) {
    console.error("SIGNUP ERROR", err);
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
    city: user.city
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({ token, user: { id: user._id, name: user.name, email, city: user.city } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;

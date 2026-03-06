// routes/profiles.js
import express from "express";
import Profile from "../models/Profile.js";
import auth from "../middleware/auth.js";

const router = express.Router();




router.post("/", auth, async (req, res) => {
  try {
   const {
    name,
    age,
    bio,
    gender,
    location,
    phone,
    price,
    pricingType
  } = req.body.data;

  const { skills = [], availability = [], photo } = req.body;

  console.log(name);
  console.log(skills);
  console.log(availability);
  console.log(photo)

    let profile = await Profile.findOne({ userId: req.user.id });

if (profile) {
   return res.status(400).json({
      message: "Profile already exists"
   });
}


    
    profile = await Profile.create({
      userId: req.user.id,
      name,
      phone,
      bio,
      gender,
      age,
      location,
      skills,
      price,
      pricingType,
      photo,
      availability,
     
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });

  } catch (error) {
    console.error("PROFILE SAVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while saving profile",
    });
  }
});




router.get('/my', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json({ profile });
  } catch (err) {
    console.error('FETCH PROFILE ERROR:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT /api/profiles – Update my profile

router.patch('/', auth, async (req, res) => {
try {
   const {
    name,
    age,
    bio,
    gender,
    location,
    phone,
    price,
    pricingType
  } = req.body;

  const { skills = [], availability = [], photo } = req.body;

  console.log(name);
  console.log(skills);
  console.log(availability);
  console.log(photo)

  
    let profile = await Profile.findOne({ userId: req.user.id });

   
    if (profile) {
      Object.assign(profile, {
        name: name ?? profile.name,
        phone: phone ?? profile.phone,
        bio: bio ?? profile.bio,
        gender: gender ?? profile.gender,
        age: age ?? profile.age,
        location: location ?? profile.location,
        skills: skills.length ? skills : profile.skills,
        price: price ?? profile.pricePerHour,
        pricingType: pricingType ?? profile.pricingType,
       photo: photo ?? profile.photo,
        availability: availability.length ? availability : profile.availability,
      });

      

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });

    }
  } catch (err) {
    console.error('PROFILE UPDATE ERROR:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});
router.get("/search", auth, async (req, res) => {
  try {

    const { skill } = req.query;

    const city = req.user.city;

    // user search ko words me tod do
    const words = skill.toLowerCase().split(" ");

    const workers = await Profile.find({
      location: { $regex: city, $options: "i" },

      skills: {
        $elemMatch: {
          $regex: words.join("|"), // OR match
          $options: "i"
        }
      }
    });

    res.json({ workers });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

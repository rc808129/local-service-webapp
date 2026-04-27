// routes/profiles.js
import express from "express";
import Profile from "../models/Profile.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();






router.post("/", auth, async (req, res) => {
  try {

    const bodyData = req.body;
    console.log(bodyData)
   const {
      name,
      age,
      bio = "",
      gender,
      location,
      phone = "",
      price = 0,
      pricingType = "service",
      skills = [],
      availability = [],
      photo                     // ← Image URL yahan aayega
    } = bodyData;               // ← Yeh line important hai

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

router.patch('/', auth, upload.single("image"),  async (req, res) => {
try {
   const data = JSON.parse(req.body.data);
   const {
    name,
    age,
    bio,
    gender,
    location,
    phone,
    price,
    pricingType
  } = data;

 const { skills = [], availability = [] } = data;

  // console.log(name);
  // console.log(skills);
  // console.log(availability);
  // console.log(photo)

  
    let profile = await Profile.findOne({ userId: req.user.id });

       if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

      const imageUrl = req.file?.path;
   
    Object.assign(profile, {
      name: name ?? profile.name,
      phone: phone ?? profile.phone,
      bio: bio ?? profile.bio,
      gender: gender ?? profile.gender,
      age: age ?? profile.age,
      location: location ?? profile.location,
      skills: skills.length ? skills : profile.skills,
      price: price ?? profile.price,
      pricingType: pricingType ?? profile.pricingType,
      photo: imageUrl ?? profile.photo, //  Cloudinary URL
      availability: availability.length ? availability : profile.availability,
    });

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
    
  } catch (err) {
    console.error('PROFILE UPDATE ERROR:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get("/search", auth, async (req, res) => {
  try {
    const { skill } = req.query;

    // Agar search empty hai to empty array return karo
    if (!skill || skill.trim() === "") {
      return res.json({ workers: [] });
    }

    const city = req.user.city;
    const searchTerm = skill.trim().toLowerCase();

    // Search words ko split karo (space ke hisaab se)
    const words = searchTerm.split(/\s+/).filter(Boolean);

    // Har word ke liye alag condition banao
    const regexConditions = words.map(word => ({
      skills: {
        $elemMatch: {
          $regex: word,        // chhota word bhi match karega
          $options: "i"        // case insensitive
        }
      }
    }));

    const workers = await Profile.find({
      // ================== CITY FILTER ==================
      location: { $regex: city, $options: "i" },

     
      $or: regexConditions
    })
      .select("name photo skills bio pricePerHour pricingType location gender age availability dist")
      .sort({ createdAt: -1 })     // Naye profiles pehle
      .limit(30);                  // Maximum 30 results

    res.json({ workers });

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ 
      msg: "Server error",
      error: error.message 
    });
  }
});
export default router;

// routes/profiles.js
import express from "express";
import Profile from "../models/Profile.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ==============================
// ➕ CREATE / UPDATE WORKER PROFILE
// POST /api/profiles
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      phone,
      bio,
      gender,
      age,
      address,
      skills = [],
      pricePerHour,
      pricingType,
      experience,
      availability = [],
      latitude,
      longitude
    } = req.body;

    let profile = await Profile.findOne({ userId: req.user.id });

    // ======================
    // 🔄 UPDATE PROFILE
    // ======================
    if (profile) {
      Object.assign(profile, {
        name: name ?? profile.name,
        phone: phone ?? profile.phone,
        bio: bio ?? profile.bio,
        gender: gender ?? profile.gender,
        age: age ?? profile.age,
        address: address ?? profile.address,
        skills: skills.length ? skills : profile.skills,
        pricePerHour: pricePerHour ?? profile.pricePerHour,
        pricingType: pricingType ?? profile.pricingType,
        experience: experience ?? profile.experience,
        availability: availability.length ? availability : profile.availability,
      });

      if (latitude && longitude) {
        profile.location = {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        };
      }

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
    }

    // ======================
    // ➕ CREATE PROFILE
    // ======================
    profile = await Profile.create({
      userId: req.user.id,
      name,
      phone,
      bio,
      gender,
      age,
      address,
      skills,
      pricePerHour,
      pricingType,
      experience,
      availability,
      location: {
        type: "Point",
        coordinates: [
          Number(longitude) || 77.2090,
          Number(latitude) || 28.6139,
        ],
      },
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



// GET /api/profiles/my – Fetch my own profile
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
router.put('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    // Update only provided fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'userId' && key !== '_id') {
        profile[key] = req.body[key];
      }
    });

    await profile.save();

    res.json({ msg: 'Profile updated successfully', profile });
  } catch (err) {
    console.error('PROFILE UPDATE ERROR:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ==============================
// 🔍 SEARCH PROFILES (NEARBY)
// GET /api/profiles/search
// ==============================
router.get("/search", async (req, res) => {
  try {
    const { skill, lat, long, radius = 5000 } = req.query;

    if (!skill || !lat || !long) {
      return res.status(400).json({
        success: false,
        message: "Missing required params: skill, lat, long",
      });
    }

    const profiles = await Profile.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [Number(long), Number(lat)],
          },
          distanceField: "distance",
          maxDistance: Number(radius),
          spherical: true,
        },
      },
      { $match: { skills: { $in: [skill] } } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          phone: 1,
          skills: 1,
          pricePerHour: 1,
          pricingType: 1,
          experience: 1,
          availability: 1,
          distance: { $round: ["$distance", 0] },
        },
      },
    ]);

    res.json({
      success: true,
      count: profiles.length,
      profiles,
    });

  } catch (error) {
    console.error("PROFILE SEARCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;

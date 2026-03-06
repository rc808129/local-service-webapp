import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null
    },

    age: {
      type: Number,
      min: 18,
      max: 100
    },

    location: {
      type: String,
      trim: true
    },

    skills: {
      type: [String],
      default: []
    },

    price: {
      type: Number,
      min: 0,
      default: 0
    },

    pricingType: {
      type: String,
      enum: ["service", "hour", "day"],
      default: "service"
    },

    availability: {
      type: [String],
      default: []
    },

    photo: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Profile", profileSchema);
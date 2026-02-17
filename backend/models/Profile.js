import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // एक यूजर की सिर्फ एक प्रोफाइल हो
    },

    // Personal Details
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
      maxlength: 500 // ज्यादा लंबा bio न हो
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', null],
      default: null
    },
    age: {
      type: Number,
      min: 18,
      max: 100
    },
    address: {
      type: String,
      trim: true
    },

    // Skills & Services
    skills: {
      type: [String],
      default: []
    },

    // Pricing
    pricePerHour: {
      type: Number,
      min: 0,
      default: 0
    },
    pricingType: {
      type: String,
      enum: ['hourly', 'daily', 'fixed'],
      default: 'hourly'
    },

    // Experience & Availability
    experience: {
      type: Number,
      min: 0,
      default: 0
    },
    availability: {
      type: [String], // ['Monday', 'Tuesday', ...]
      default: []
    },

    // Location (Geospatial)
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    },

    // Photo (Cloudinary या URL)
    photo: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true // createdAt, updatedAt ऑटो ऐड हो जाएंगे
  }
);

// Geospatial index – जरूरी है nearby search के लिए
profileSchema.index({ location: '2dsphere' });

// Optional: अगर name और phone unique रखना चाहो
// profileSchema.index({ phone: 1 }, { unique: true, sparse: true });

export default mongoose.model('Profile', profileSchema);
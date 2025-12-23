import mongoose from 'mongoose';

/**
 * Photographer Model Schema
 * Stores all photographer information including services, ratings, and gallery
 */

const photographerSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: [true, 'Photographer name is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
    },

    // Location & Pricing
    city: {
      type: String,
      required: [true, 'City is required'],
      index: true,
    },
    priceRange: {
      type: String,
      required: [true, 'Price range is required'],
      example: '₹50,000 - ₹1,50,000',
    },

    // Services & Categories
    services: {
      type: [String],
      default: [],
      example: ['Wedding Photography', 'Pre-Wedding Shoots', 'Candid Photography'],
    },
    categories: {
      type: [String],
      index: true,
      default: [],
      example: ['Wedding', 'Pre-Wedding', 'Candid'],
    },

    // Experience
    about: {
      type: String,
      required: [true, 'About section is required'],
      maxlength: 2000,
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
      example: '10+ years',
    },

    // Media
    gallery: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.length <= 20,
        message: 'Maximum 20 gallery images allowed',
      },
    },
    videos: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.length <= 5,
        message: 'Maximum 5 videos allowed',
      },
    },

    // Status & Verification
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Ratings (aggregated from reviews)
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
      index: true,
    },

    // Metadata
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'photographers',
  }
);

// Indexing for search and filtering
photographerSchema.index({ city: 1, featured: 1 });
photographerSchema.index({ categories: 1, verified: 1 });
photographerSchema.index({ rating: -1 });

const Photographer = mongoose.model('Photographer', photographerSchema);

export default Photographer;

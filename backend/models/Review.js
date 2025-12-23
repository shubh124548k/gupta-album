import mongoose from 'mongoose';

/**
 * Review Model Schema
 * Stores customer reviews and ratings for photographers
 */

const reviewSchema = new mongoose.Schema(
  {
    // Reference to Photographer
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
      required: [true, 'Photographer reference is required'],
      index: true,
    },

    // Reviewer Information
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      index: true,
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
    },

    // Review Content
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      index: true,
    },
    text: {
      type: String,
      required: [true, 'Review text is required'],
      minlength: [10, 'Review must be at least 10 characters'],
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },

    // Status
    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },
    isApproved: {
      type: Boolean,
      default: true,
      index: true,
    },

    // Engagement
    helpful: {
      type: Number,
      default: 0,
    },
    unhelpful: {
      type: Number,
      default: 0,
    },

    // Timestamps
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
    collection: 'reviews',
  }
);

// Compound index for finding reviews by photographer
reviewSchema.index({ photographerId: 1, isApproved: 1 });
reviewSchema.index({ photographerId: 1, rating: -1 });

// Update photographer's average rating when review is saved
reviewSchema.post('save', async function () {
  const Review = this.constructor;
  const Photographer = require('./Photographer').default;

  const stats = await Review.aggregate([
    { $match: { photographerId: this.photographerId, isApproved: true } },
    {
      $group: {
        _id: '$photographerId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Photographer.findByIdAndUpdate(this.photographerId, {
      rating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].reviewCount,
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;

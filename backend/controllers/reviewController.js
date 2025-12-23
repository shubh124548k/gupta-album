import Review from '../models/Review.js';
import Photographer from '../models/Photographer.js';

/**
 * Get all reviews for a photographer
 */
export const getReviewsByPhotographer = async (req, res) => {
  try {
    const { photographerId } = req.params;
    const { page = 1, limit = 10, sort = 'recent' } = req.query;

    // Validate photographer exists
    const photographer = await Photographer.findById(photographerId);
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found',
      });
    }

    const skip = (page - 1) * limit;
    let sortOption = { createdAt: -1 };

    if (sort === 'highest') sortOption = { rating: -1 };
    if (sort === 'lowest') sortOption = { rating: 1 };
    if (sort === 'helpful') sortOption = { helpful: -1 };

    const reviews = await Review.find({
      photographerId,
      isApproved: true,
    })
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments({
      photographerId,
      isApproved: true,
    });

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};

/**
 * Create a new review
 */
export const createReview = async (req, res) => {
  try {
    const { photographerId, userName, rating, text } = req.body;

    // Validate photographer exists
    const photographer = await Photographer.findById(photographerId);
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found',
      });
    }

    // Generate unique user ID for anonymous users
    const userId = `u${Date.now()}`;

    const review = new Review({
      photographerId,
      userId,
      userName: userName || 'Anonymous User',
      rating,
      text,
      isVerified: false,
      isApproved: true, // Auto-approve for now (can add moderation later)
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating review',
      error: error.message,
    });
  }
};

/**
 * Get review statistics for a photographer
 */
export const getReviewStatistics = async (req, res) => {
  try {
    const { photographerId } = req.params;

    // Validate photographer exists
    const photographer = await Photographer.findById(photographerId);
    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found',
      });
    }

    // Get rating distribution
    const stats = await Review.aggregate([
      {
        $match: {
          photographerId: require('mongoose').Types.ObjectId(photographerId),
          isApproved: true,
        },
      },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    const totalReviews = stats.reduce((sum, stat) => sum + stat.count, 0);
    const averageRating =
      stats.reduce((sum, stat) => sum + stat._id * stat.count, 0) / totalReviews || 0;

    const distribution = {
      5: stats.find((s) => s._id === 5)?.count || 0,
      4: stats.find((s) => s._id === 4)?.count || 0,
      3: stats.find((s) => s._id === 3)?.count || 0,
      2: stats.find((s) => s._id === 2)?.count || 0,
      1: stats.find((s) => s._id === 1)?.count || 0,
    };

    res.status(200).json({
      success: true,
      data: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        distribution,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review statistics',
      error: error.message,
    });
  }
};

/**
 * Mark review as helpful
 */
export const markReviewHelpful = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { helpful = true } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    if (helpful) {
      review.helpful += 1;
    } else {
      review.unhelpful += 1;
    }

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review marked',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error marking review',
      error: error.message,
    });
  }
};

/**
 * Delete review (admin only or owner)
 */
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting review',
      error: error.message,
    });
  }
};

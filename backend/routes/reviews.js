import express from 'express';
import {
  getReviewsByPhotographer,
  createReview,
  getReviewStatistics,
  markReviewHelpful,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get reviews for a photographer
router.get('/photographer/:photographerId', getReviewsByPhotographer);

// Get review statistics for a photographer
router.get('/statistics/:photographerId', getReviewStatistics);

// Create a review
router.post('/', createReview);

// Mark review as helpful
router.put('/:reviewId/helpful', markReviewHelpful);

/**
 * Admin Routes
 */

// Delete review
router.delete('/:reviewId', deleteReview);

export default router;

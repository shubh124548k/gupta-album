import express from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  getRecentBlogs,
  getBlogsByCategory,
  createBlog,
  updateBlog,
} from '../controllers/blogController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all blogs with filters
router.get('/', getAllBlogs);

// Get featured blogs
router.get('/featured', getFeaturedBlogs);

// Get recent blogs
router.get('/recent', getRecentBlogs);

// Get blogs by category
router.get('/category/:category', getBlogsByCategory);

// Get blog by slug
router.get('/:slug', getBlogBySlug);

/**
 * Admin Routes (requires authentication)
 */

// Create blog
router.post('/', createBlog);

// Update blog
router.put('/:id', updateBlog);

export default router;

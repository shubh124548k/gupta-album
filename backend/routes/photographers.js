import express from 'express';
import {
  getAllPhotographers,
  getPhotographerById,
  getFeaturedPhotographers,
  getPhotographersByCity,
  createPhotographer,
  updatePhotographer,
} from '../controllers/photographerController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Get all photographers with filters
router.get('/', getAllPhotographers);

// Get featured photographers
router.get('/featured', getFeaturedPhotographers);

// Get photographers by city
router.get('/city/:city', getPhotographersByCity);

// Get photographer by ID
router.get('/:id', getPhotographerById);

/**
 * Admin Routes (requires authentication - to be added later)
 */

// Create photographer
router.post('/', createPhotographer);

// Update photographer
router.put('/:id', updatePhotographer);

export default router;

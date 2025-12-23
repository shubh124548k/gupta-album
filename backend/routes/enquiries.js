import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  getEnquiryStats,
} from '../controllers/enquiryController.js';

const router = express.Router();

/**
 * Public Routes
 */

// Create enquiry
router.post('/', createEnquiry);

/**
 * Admin Routes (requires authentication)
 */

// Get all enquiries
router.get('/', getAllEnquiries);

// Get enquiry statistics
router.get('/statistics', getEnquiryStats);

// Get enquiry by ID
router.get('/:id', getEnquiryById);

// Update enquiry status
router.put('/:id/status', updateEnquiryStatus);

export default router;

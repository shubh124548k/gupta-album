import Photographer from '../models/Photographer.js';
import Review from '../models/Review.js';

/**
 * Get all photographers with optional filtering
 * Query params: city, category, featured, verified, search
 */
export const getAllPhotographers = async (req, res) => {
  try {
    const { city, category, featured, verified, search, page = 1, limit = 12 } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (city) filter.city = city;
    if (featured === 'true') filter.featured = true;
    if (verified === 'true') filter.verified = true;
    if (category) filter.categories = category;

    // Search in name, about, or city
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { about: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const photographers = await Photographer.find(filter)
      .sort({ featured: -1, rating: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Photographer.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: photographers,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching photographers',
      error: error.message,
    });
  }
};

/**
 * Get photographer by ID with reviews
 */
export const getPhotographerById = async (req, res) => {
  try {
    const { id } = req.params;

    const photographer = await Photographer.findById(id);

    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found',
      });
    }

    // Get reviews
    const reviews = await Review.find({
      photographerId: id,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        ...photographer.toObject(),
        reviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching photographer',
      error: error.message,
    });
  }
};

/**
 * Get featured photographers
 */
export const getFeaturedPhotographers = async (req, res) => {
  try {
    const photographers = await Photographer.find({
      featured: true,
      isActive: true,
    })
      .sort({ rating: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: photographers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured photographers',
      error: error.message,
    });
  }
};

/**
 * Get photographers by city
 */
export const getPhotographersByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const photographers = await Photographer.find({
      city: { $regex: city, $options: 'i' },
      isActive: true,
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: photographers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching photographers by city',
      error: error.message,
    });
  }
};

/**
 * Create new photographer (admin only)
 */
export const createPhotographer = async (req, res) => {
  try {
    const photographer = new Photographer(req.body);
    await photographer.save();

    res.status(201).json({
      success: true,
      message: 'Photographer created successfully',
      data: photographer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating photographer',
      error: error.message,
    });
  }
};

/**
 * Update photographer (admin only)
 */
export const updatePhotographer = async (req, res) => {
  try {
    const { id } = req.params;

    const photographer = await Photographer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!photographer) {
      return res.status(404).json({
        success: false,
        message: 'Photographer not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Photographer updated successfully',
      data: photographer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating photographer',
      error: error.message,
    });
  }
};

import Blog from '../models/Blog.js';

/**
 * Get all blogs with filtering and pagination
 */
export const getAllBlogs = async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10, search } = req.query;

    // Build filter
    const filter = { isPublished: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      isPublished: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message,
    });
  }
};

/**
 * Get featured blogs
 */
export const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    const blogs = await Blog.find({
      isPublished: true,
      isFeatured: true,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blogs',
      error: error.message,
    });
  }
};

/**
 * Get recent blogs
 */
export const getRecentBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent blogs',
      error: error.message,
    });
  }
};

/**
 * Get blogs by category
 */
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const blogs = await Blog.find({
      category,
      isPublished: true,
    })
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs by category',
      error: error.message,
    });
  }
};

/**
 * Create new blog (admin only)
 */
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating blog',
      error: error.message,
    });
  }
};

/**
 * Update blog (admin only)
 */
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating blog',
      error: error.message,
    });
  }
};

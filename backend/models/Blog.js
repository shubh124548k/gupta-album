import mongoose from 'mongoose';

/**
 * Blog Model Schema
 * Stores all blog articles with SEO-friendly slugs and metadata
 */

const blogSchema = new mongoose.Schema(
  {
    // Content
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },

    // Media
    image: {
      type: String,
      required: [true, 'Featured image is required'],
    },

    // Author & Metadata
    author: {
      type: String,
      required: [true, 'Author name is required'],
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
      enum: [
        'Wedding Photography',
        'Trends',
        'Tips & Tricks',
        'Photography Styles',
        'Editing',
        'Industry News',
        'Inspiration',
      ],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },

    // SEO & Statistics
    readTime: {
      type: String,
      example: '5 min read',
    },
    views: {
      type: Number,
      default: 0,
    },

    // Status
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Timestamps
    publishedAt: {
      type: Date,
      default: Date.now,
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
    collection: 'blogs',
  }
);

// Index for quick queries
blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishedAt: -1 });

// Ensure slug is generated from title if not provided
blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

import mongoose from 'mongoose';

/**
 * Enquiry Model Schema
 * Stores contact form enquiries from users
 */

const enquirySchema = new mongoose.Schema(
  {
    // Sender Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },

    // Message
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
    },

    // Related Photographer (optional)
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
      default: null,
      index: true,
    },
    photographerName: {
      type: String,
      default: 'General Enquiry',
    },

    // Status Tracking
    status: {
      type: String,
      enum: ['new', 'viewed', 'responded', 'closed'],
      default: 'new',
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },

    // Admin Assignment
    assignedTo: {
      type: String,
      default: null,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'enquiries',
  }
);

// Index for queries
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ photographerId: 1, status: 1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;

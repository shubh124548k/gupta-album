import Enquiry from '../models/Enquiry.js';
import sendEmailViaWeb3Forms from '../utils/emailService.js';

/**
 * Create a new enquiry
 */
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, photographerId, photographerName, photographerEmail } =
      req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    // Create enquiry
    const enquiry = new Enquiry({
      name,
      email,
      phone: phone || '',
      message,
      photographerId: photographerId || null,
      photographerName: photographerName || 'General Enquiry',
      status: 'new',
    });

    await enquiry.save();

    // Send emails
    try {
      // Email to admin
      await sendEmailViaWeb3Forms({
        to_email: process.env.ADMIN_EMAIL || 'navinbusinessgupta@gmail.com',
        subject: '📩 New Photography Enquiry - Gupta Album',
        from_name: name,
        from_email: email,
        message: `
New Enquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Photographer: ${photographerName || 'General Enquiry'}
Message:
${message}

---
Please respond to this enquiry at your earliest convenience.
        `,
      });

      // Email to photographer (if specified)
      if (photographerEmail && photographerId) {
        await sendEmailViaWeb3Forms({
          to_email: photographerEmail,
          subject: '📸 New Client Enquiry - Gupta Album',
          from_name: name,
          from_email: email,
          message: `
You have a new client enquiry:

Client Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message:
${message}

---
Please respond to this enquiry as soon as possible.
        `,
        });
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating enquiry',
      error: error.message,
    });
  }
};

/**
 * Get all enquiries (admin only)
 */
export const getAllEnquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('photographerId', 'name email');

    const total = await Enquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiries',
      error: error.message,
    });
  }
};

/**
 * Get enquiry by ID
 */
export const getEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findById(id).populate('photographerId', 'name email phone');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    // Mark as viewed
    if (enquiry.status === 'new') {
      enquiry.status = 'viewed';
      await enquiry.save();
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry',
      error: error.message,
    });
  }
};

/**
 * Update enquiry status
 */
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        status,
        notes: notes || enquiry.notes,
        respondedAt: status === 'responded' ? new Date() : enquiry.respondedAt,
      },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating enquiry',
      error: error.message,
    });
  }
};

/**
 * Get enquiry statistics (admin only)
 */
export const getEnquiryStats = async (req, res) => {
  try {
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const total = await Enquiry.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        total,
        byStatus: stats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enquiry statistics',
      error: error.message,
    });
  }
};

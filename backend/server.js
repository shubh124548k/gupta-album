import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import config from './config/environment.js';

// Import routes
import photographerRoutes from './routes/photographers.js';
import blogRoutes from './routes/blogs.js';
import reviewRoutes from './routes/reviews.js';
import enquiryRoutes from './routes/enquiries.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// API Routes
const API_BASE = `/api/${config.API_VERSION}`;

app.use(`${API_BASE}/photographers`, photographerRoutes);
app.use(`${API_BASE}/blogs`, blogRoutes);
app.use(`${API_BASE}/reviews`, reviewRoutes);
app.use(`${API_BASE}/enquiries`, enquiryRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Gupta Album API',
    version: config.API_VERSION,
    endpoints: {
      photographers: `${API_BASE}/photographers`,
      blogs: `${API_BASE}/blogs`,
      reviews: `${API_BASE}/reviews`,
      enquiries: `${API_BASE}/enquiries`,
    },
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: config.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Database Connection & Server Start
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log(`
🚀 Gupta Album API Server Running
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Port: ${PORT}
Environment: ${config.NODE_ENV}
MongoDB: ${config.MONGODB_URI}
API Base: ${API_BASE}
Frontend: ${config.FRONTEND_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;

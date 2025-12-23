/**
 * Environment Configuration
 * Centralized configuration for all environment variables
 */

const config = {
  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gupta-album',

  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // API
  API_VERSION: 'v1',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000',

  // Frontend URL for CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Web3Forms
  WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'navinbusinessgupta@gmail.com',
};

export default config;

# Gupta Album Backend API

Professional backend API for the Gupta Album wedding photography platform built with Node.js, Express, and MongoDB.

## 📋 Project Structure

```
backend/
├── config/
│   ├── database.js           # MongoDB connection configuration
│   └── environment.js        # Environment variables
├── models/
│   ├── Photographer.js       # Photographer schema
│   ├── Blog.js              # Blog schema
│   ├── Review.js            # Review schema
│   └── Enquiry.js           # Enquiry/Contact schema
├── controllers/
│   ├── photographerController.js  # Photographer logic
│   ├── blogController.js         # Blog logic
│   ├── reviewController.js       # Review logic
│   └── enquiryController.js      # Enquiry logic
├── routes/
│   ├── photographers.js     # Photographer endpoints
│   ├── blogs.js            # Blog endpoints
│   ├── reviews.js          # Review endpoints
│   └── enquiries.js        # Enquiry endpoints
├── utils/
│   ├── emailService.js     # Web3Forms email integration
│   └── responseHelper.js   # Response formatting
└── server.js               # Main application entry point
```

## 🚀 Installation & Setup

### 1. Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/gupta-album

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Web3Forms Email Service
WEB3FORMS_ACCESS_KEY=your_api_key_here
ADMIN_EMAIL=navinbusinessgupta@gmail.com
```

### 4. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run at `http://localhost:5000`

## 📚 API Endpoints

### Photographers
- `GET /api/v1/photographers` - Get all photographers (with filters)
- `GET /api/v1/photographers/:id` - Get photographer by ID
- `GET /api/v1/photographers/featured` - Get featured photographers
- `GET /api/v1/photographers/city/:city` - Get photographers by city
- `POST /api/v1/photographers` - Create photographer (admin)
- `PUT /api/v1/photographers/:id` - Update photographer (admin)

### Blogs
- `GET /api/v1/blogs` - Get all blogs (with filters)
- `GET /api/v1/blogs/:slug` - Get blog by slug
- `GET /api/v1/blogs/featured` - Get featured blogs
- `GET /api/v1/blogs/recent` - Get recent blogs
- `GET /api/v1/blogs/category/:category` - Get blogs by category
- `POST /api/v1/blogs` - Create blog (admin)
- `PUT /api/v1/blogs/:id` - Update blog (admin)

### Reviews
- `GET /api/v1/reviews/photographer/:photographerId` - Get reviews for photographer
- `GET /api/v1/reviews/statistics/:photographerId` - Get review statistics
- `POST /api/v1/reviews` - Create review
- `PUT /api/v1/reviews/:reviewId/helpful` - Mark review as helpful
- `DELETE /api/v1/reviews/:reviewId` - Delete review (admin)

### Enquiries
- `POST /api/v1/enquiries` - Create enquiry (contact form)
- `GET /api/v1/enquiries` - Get all enquiries (admin)
- `GET /api/v1/enquiries/:id` - Get enquiry by ID (admin)
- `PUT /api/v1/enquiries/:id/status` - Update enquiry status (admin)
- `GET /api/v1/enquiries/statistics` - Get enquiry statistics (admin)

## 🔧 Key Features

### Data Models

#### Photographer
- Complete photographer information
- Services and categories
- Gallery and video management
- Rating aggregation from reviews
- Featured and verified status
- Full-text search indexing

#### Blog
- SEO-friendly slugs
- Category and tag management
- Featured articles
- View tracking
- Automatic read time calculation
- Publishing status control

#### Review
- Star ratings (1-5)
- Helpful/unhelpful tracking
- Automatic rating aggregation
- Verification status
- Moderation support

#### Enquiry
- Contact form submissions
- Photographer assignment
- Status tracking (new, viewed, responded, closed)
- Admin assignment support
- Response tracking

### Email Integration (Web3Forms)

The backend uses **Web3Forms** for reliable email delivery without managing server infrastructure:

- ✅ Admin notifications on new enquiries
- ✅ Photographer notifications on client interest
- ✅ No email server required
- ✅ Scalable and reliable

**Setup Web3Forms:**
1. Visit [web3forms.com](https://web3forms.com)
2. Sign up and get your API key
3. Add to `.env` as `WEB3FORMS_ACCESS_KEY`

## 🔐 Security Considerations

### Current Implementation
- CORS enabled for frontend URL
- Request body size limits
- Input validation via Mongoose schemas

### Recommended Additions (Future)
- JWT authentication for admin routes
- Rate limiting
- Input sanitization
- Request logging
- HTTPS enforcement

## 💾 Database Seeding

To populate initial data:

```bash
npm run seed
```

This will add sample photographers, blogs, and reviews to your MongoDB.

## 📊 Query Examples

### Filter Photographers by City
```bash
GET /api/v1/photographers?city=Delhi&featured=true
```

### Search Photographers
```bash
GET /api/v1/photographers?search=candid%20photography
```

### Get Recent Blogs
```bash
GET /api/v1/blogs/recent?limit=5
```

### Get Reviews for Photographer
```bash
GET /api/v1/reviews/photographer/photographerId?sort=highest&limit=10
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or connection string is correct
- Check if firewall allows MongoDB port (27017)
- For MongoDB Atlas, whitelist your IP

### Emails Not Sending
- Verify Web3Forms API key in `.env`
- Check email configuration
- Review Web3Forms dashboard for errors

### CORS Issues
- Ensure `FRONTEND_URL` matches your frontend domain
- Check browser console for specific CORS errors

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/gupta-album` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment type | `development` \| `production` |
| `FRONTEND_URL` | Frontend domain for CORS | `http://localhost:5173` |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms API key | (get from web3forms.com) |
| `ADMIN_EMAIL` | Admin email for enquiries | `admin@example.com` |

## 📄 License

ISC

## 👥 Support

For issues or questions, please open an issue on the repository.

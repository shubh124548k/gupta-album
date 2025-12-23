# Gupta Album - Wedding Photography Platform

A modern, responsive web platform connecting couples with India's finest wedding photographers. Built with React, TypeScript, MongoDB, and Node.js.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## ✨ Features

### For Users
✅ **Browse Photographers** - Explore verified photographers across India
✅ **View Portfolios** - Gallery and video portfolios with ratings
✅ **Read Reviews** - Authentic reviews from past clients
✅ **Post Reviews** - Share your experience anonymously
✅ **Contact Directly** - Enquire with specific photographers
✅ **Photography Blog** - Tips, trends, and inspiration
✅ **No Sign-up Required** - Full access without authentication

### For Photographers
📸 Professional profiles with service details
⭐ Automated rating system from reviews
🎬 Gallery and video portfolio management
📧 Enquiry notifications via email

### For Administrators
🔧 Photographer management
📝 Blog publishing and management
📊 Enquiry tracking and statistics
📧 Web3Forms email integration

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **shadcn/ui** - Component library
- **Three.js** - 3D effects

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Web3Forms** - Email service
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
gupta-album/
├── src/                           # Frontend source
│   ├── components/               # React components
│   │   ├── ContactForm.tsx       # Contact form with Web3Forms
│   │   ├── Header.tsx            # Navigation (no auth buttons)
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Home page
│   │   ├── Photographers.tsx     # Photographer listing
│   │   ├── Blog.tsx              # Blog listing
│   │   └── ...
│   ├── contexts/                 # React contexts
│   │   └── ReviewsContext.tsx    # Reviews management
│   ├── data/                     # Static data (transitioning to MongoDB)
│   │   ├── photographers.ts
│   │   ├── blogs.ts
│   │   └── reviews.ts
│   └── ...
│
├── backend/                      # Backend API
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── environment.js       # Config
│   ├── models/
│   │   ├── Photographer.js      # Schema
│   │   ├── Blog.js             # Schema
│   │   ├── Review.js           # Schema
│   │   └── Enquiry.js          # Schema
│   ├── controllers/            # Business logic
│   ├── routes/                 # API routes
│   ├── utils/
│   │   └── emailService.js     # Web3Forms integration
│   ├── server.js               # Express app
│   └── package.json
│
├── netlify/                      # Netlify functions (fallback)
│   └── functions/
│       └── send-enquiry.js      # Fallback email via Web3Forms
│
├── IMPLEMENTATION_GUIDE.md       # Detailed setup guide
└── README.md                     # This file

```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
echo 'VITE_API_URL=http://localhost:5000' > .env.local

# Start development server
npm run dev
# Opens at http://localhost:5173
```

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure MongoDB and Web3Forms in .env

# Start server
npm run dev
# Runs at http://localhost:5000
```

### Start Both Servers
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev

# Visit http://localhost:5173
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

#### Photographers
```
GET    /photographers              Get all photographers
GET    /photographers/:id          Get photographer details
GET    /photographers/featured     Get featured photographers
GET    /photographers/city/:city   Get by city
POST   /photographers              Create (admin)
PUT    /photographers/:id          Update (admin)
```

#### Blogs
```
GET    /blogs                      Get all blogs
GET    /blogs/:slug                Get blog by slug
GET    /blogs/featured             Get featured blogs
GET    /blogs/recent               Get recent blogs
GET    /blogs/category/:category   Get by category
POST   /blogs                      Create (admin)
PUT    /blogs/:id                  Update (admin)
```

#### Reviews
```
GET    /reviews/photographer/:id        Get photographer reviews
GET    /reviews/statistics/:id          Get statistics
POST   /reviews                         Create review
PUT    /reviews/:id/helpful             Mark helpful
DELETE /reviews/:id                     Delete (admin)
```

#### Enquiries
```
POST   /enquiries                   Submit contact enquiry
GET    /enquiries                   Get all (admin)
GET    /enquiries/:id               Get details (admin)
PUT    /enquiries/:id/status        Update status (admin)
```

## ⚙️ Environment Variables

### Frontend `.env.local`
```env
VITE_API_URL=http://localhost:5000
```

### Backend `.env`
```env
# Database
MONGODB_URI=mongodb://localhost:27017/gupta-album

# Server
PORT=5000
NODE_ENV=development

# Frontend (CORS)
FRONTEND_URL=http://localhost:5173

# Email Service
WEB3FORMS_ACCESS_KEY=your_api_key_here
ADMIN_EMAIL=navinbusinessgupta@gmail.com
```

## 🔄 Authentication Changes

### What Changed (v2.0)
✅ **Removed Authentication System**
- No sign-up or sign-in required
- All features accessible without login
- Anonymous reviews and enquiries
- Simplified user experience

### Old Flow (v1.0)
❌ Required sign-up/login
❌ Gated photographer access
❌ Auth modal on photographers page

### New Flow (v2.0)
✅ Browse freely
✅ Post reviews anonymously
✅ Submit enquiries directly
✅ No registration needed

## 📧 Email Service

### Web3Forms Integration

**What It Does:**
- Sends admin notification on new enquiry
- Notifies photographer of client interest
- Reliable delivery without server complexity

**Setup:**
1. Visit [web3forms.com](https://web3forms.com)
2. Sign up (free tier available)
3. Get API key
4. Add to `.env`

**Emails Sent:**
- Admin receives all enquiries with details
- Photographers receive client messages
- HTML formatted professional emails

## 🗄️ Database

### MongoDB Collections

#### photographers
- Professional profiles
- Services and categories
- Gallery and videos
- Ratings (aggregated from reviews)
- Verified status

#### blogs
- Articles with SEO slugs
- Categories and tags
- Featured articles
- View tracking

#### reviews
- Star ratings (1-5)
- Anonymous reviews
- Helpful/unhelpful counts
- Auto-aggregated ratings

#### enquiries
- Contact form submissions
- Photographer references
- Status tracking
- Admin assignment

## 🔒 Security Notes

### Current Implementation
- Input validation via Mongoose
- CORS protection
- Rate limiting ready

### Recommended Additions
- JWT authentication for admin
- Request sanitization
- Request logging
- HTTPS enforcement

## 📊 Performance

- ⚡ Fast React rendering (Vite)
- 🎬 Smooth animations (Framer Motion)
- 📦 Optimized bundle size
- 🗄️ Indexed MongoDB queries
- 🔄 Efficient data fetching

## 🧪 Testing

### Manual Testing Checklist
- [ ] Browse photographers without login
- [ ] Search by city/category
- [ ] View photographer details
- [ ] Post anonymous review
- [ ] Submit contact enquiry
- [ ] Receive email notification
- [ ] Read blog articles
- [ ] Mobile responsive

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

### Email Not Sending
1. Verify Web3Forms API key
2. Check admin email in `.env`
3. Review Web3Forms dashboard
4. Check backend console

### CORS Errors
1. Verify frontend URL in backend `.env`
2. Ensure backend server is running
3. Check API endpoint URLs

## 📈 Deployment

### Frontend (Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
npm install
npm start
```

### Environment Variables (Production)
- Use MongoDB Atlas connection string
- Update `FRONTEND_URL` to production domain
- Use production Web3Forms account

## 📝 Changelog

### v2.0.0 (December 2025)
- ✅ Removed authentication system
- ✅ Added MongoDB backend
- ✅ Integrated Web3Forms email
- ✅ Complete API structure
- ✅ Professional data models
- ✅ Clean code architecture

### v1.0.0 (Initial Release)
- Basic photographer listing
- Blog functionality
- Review system with auth
- Resend email integration

## 🚦 Status

| Feature | Status |
|---------|--------|
| Frontend | ✅ Production Ready |
| Backend API | ✅ Ready |
| MongoDB Integration | ✅ Ready |
| Email Service | ✅ Web3Forms Ready |
| Authentication | ❌ Removed |
| Admin Panel | 🔄 Coming Soon |
| Mobile App | 🔄 Planned |

## 📞 Support

- **Documentation**: See `IMPLEMENTATION_GUIDE.md`
- **Backend Docs**: See `backend/README.md`
- **Issues**: Open GitHub issue
- **Email**: Contact admin

## 📄 License

ISC License - See LICENSE file

## 👨‍💻 Author

Gupta Album Team

## 🎯 Roadmap

- [ ] Admin authentication & dashboard
- [ ] Advanced search filters
- [ ] Photographer onboarding
- [ ] Payment integration
- [ ] Booking system
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] Recommendation engine

---

**Version**: 2.0.0  
**Last Updated**: December 23, 2025  
**Status**: Active Development

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

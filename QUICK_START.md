# 🚀 Quick Start Guide

Get the Gupta Album platform running in 5 minutes!

## Prerequisites ✅
- Node.js 16+ installed
- MongoDB running (local or Atlas)
- Web3Forms API key (free from web3forms.com)

---

## Step 1: Frontend Setup (2 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Frontend runs on http://localhost:5173
```

---

## Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - MongoDB URI
# - Web3Forms API Key
# - Admin email
```

**`.env` Template:**
```env
MONGODB_URI=mongodb://localhost:27017/gupta-album
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
WEB3FORMS_ACCESS_KEY=your_key_here
ADMIN_EMAIL=navinbusinessgupta@gmail.com
```

---

## Step 3: Start Backend (1 minute)

```bash
# From backend folder
npm run dev

# Backend runs on http://localhost:5000
```

---

## 🎉 Done!

Both servers running:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## ✨ What You Can Do

1. **Browse Photographers** - No login required
2. **View Reviews** - See what others say
3. **Post Anonymous Review** - Share your experience
4. **Submit Enquiry** - Contact photographers
5. **Read Blog** - Photography tips and trends

---

## 🔑 Get Web3Forms API Key (Optional Setup)

If emails not working:
1. Visit https://web3forms.com
2. Sign up (free)
3. Get your API key
4. Add to backend `.env`

---

## 📧 Test Email Sending

1. Visit http://localhost:5173
2. Go to "Contact Us"
3. Fill form and submit
4. Check emails sent to admin and photographer

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
```

### Port Already in Use
```bash
# Change port in backend/.env
PORT=5001
```

### CORS Error
- Ensure backend `.env` has correct FRONTEND_URL
- Restart backend server

---

## 📚 Full Documentation

- **Setup Guide**: See `IMPLEMENTATION_GUIDE.md`
- **Backend Docs**: See `backend/README.md`
- **API Reference**: Visit http://localhost:5000

---

## 🎯 API Quick Reference

```bash
# Get photographers
curl http://localhost:5000/api/v1/photographers

# Get blogs
curl http://localhost:5000/api/v1/blogs

# Get reviews
curl http://localhost:5000/api/v1/reviews/photographer/{id}

# Submit enquiry
curl -X POST http://localhost:5000/api/v1/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "message": "I want to book your services"
  }'
```

---

## 📊 What's Included

✅ Frontend React App
✅ MongoDB Backend API
✅ 23 API Endpoints
✅ Web3Forms Email
✅ Anonymous Reviews
✅ Enquiry Tracking
✅ Professional Code
✅ Full Documentation

---

**Ready to go! 🚀**

Visit http://localhost:5173 to start exploring.

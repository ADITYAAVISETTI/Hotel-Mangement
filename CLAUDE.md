# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hotel Management System with separate frontend and backend applications:
- **Backend**: Node.js/Express API with MongoDB database (located in `backend/`)
- **Frontend**: Vanilla JavaScript/HTML/CSS application (located in `frontend/`)

## Common Development Commands

### Backend Commands
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server with nodemon (hot reload)
npm start

# The backend runs on port 3000 by default
```

### Frontend Commands
The frontend is a static site - open `frontend/index.html` directly in a browser or serve with any static file server.

## Architecture Overview

### Backend Structure
- **Entry Point**: `index.js` - Configures Express server with CORS, connects to MongoDB, and sets up routes
- **Database**: MongoDB connection via Mongoose, database name: `HotelManagement`
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **API Routes**:
  - `/api/user/register` - User registration
  - `/api/user/login` - User login
  - `/bookings` - CRUD operations for bookings
  - `/rooms` - Room management endpoints
  - `/hotel` - Hotel management endpoints
  - `/api/posts` - Protected posts route

### Key Backend Components
- **Models** (`model/`): Mongoose schemas for User, Hotel, Booking, and Rooms
- **Controllers** (`controllers/`): Business logic for bookings, hotels, and rooms
- **Routes** (`routes/`): Express routers defining API endpoints
- **Validation**: Joi-based validation in `validation.js` for user registration/login
- **Middleware**: JWT verification in `routes/verifyToken.js` for protected routes

### Frontend Structure
- **Pages**: Separate HTML files for different functionalities (index, admin, hotel, rooms, booking, user)
- **JavaScript**: Individual JS files for each page handling API interactions
- **Styling**: CSS in `assets/css/styles.css`
- **API Integration**: Frontend makes requests to `http://localhost:3000` backend

## Environment Configuration

Create a `.env` file in the backend directory with:
```
DB_CONNECT=mongodb://127.0.0.1:27017/HotelManagement
TOKEN_SECRET=your_secret_key_here
PORT=3000
```

## Database Schema

- **User**: name, email, password (hashed), role
- **Hotel**: area, Name_of_the_Hotel, Amenties, Location
- **Booking**: Contains booking details (schema in `model/booking.js`)
- **Room**: Room information (schema in `model/rooms.js`)

## Development Notes

- CORS is enabled on the backend to allow frontend requests
- Authentication uses JWT tokens stored in the TOKEN_SECRET environment variable
- The backend uses nodemon for development hot reloading
- MongoDB must be running locally on port 27017
- User roles are required during registration but validation needs adjustment in `validation.js`
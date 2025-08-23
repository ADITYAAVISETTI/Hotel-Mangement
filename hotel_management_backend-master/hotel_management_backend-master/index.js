const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const bookingsRouter = require('./routes/bookings');
const roomRouter = require('./routes/rooms');
const routesBooking = require('./routes/hotel');

const app = express();
dotenv.config();

// Use the cors middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use an array for database connections
mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
  });

// Import routes
app.use(bookingsRouter);
app.use(roomRouter);
app.use(routesBooking);
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

// Start the server after setting up connections
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));

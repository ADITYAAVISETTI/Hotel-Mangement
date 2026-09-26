const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  area: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);


module.exports = Booking;
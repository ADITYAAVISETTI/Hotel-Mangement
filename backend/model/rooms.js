const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
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
  capacity: {
    type: Number,
    required: true,
  },
  bedConfiguration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('rooms', roomSchema);

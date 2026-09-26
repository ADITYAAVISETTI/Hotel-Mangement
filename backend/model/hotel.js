const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({

  area: {
    type: String,
    required: true,
  },
  Name_of_the_Hotel: {
    type: String,
    required: true,
  },
  Amenties: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },

});

const bookingsModel = mongoose.model('hotels', bookingsSchema);

module.exports = bookingsModel;

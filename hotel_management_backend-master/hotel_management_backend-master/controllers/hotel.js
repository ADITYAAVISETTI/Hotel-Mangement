const bookingsModel = require('../model/hotel');

module.exports = {
  getAllbookings: async (req, res) => {
    try {
      const bookings = await bookingsModel.find({});
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getbookingsById: async (req, res) => {
    try {
      const { id } = req.params;
      const bookings = await bookingsModel.findById(id);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBookings: async (req, res) => {
    try {
      const newBooking = await bookingsModel.create(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatebookings: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBooking = await bookingsModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedBooking) {
        return res.status(404).json({ message: `Cannot find bookings by ID ${id}` });
      }

      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletebookings: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBooking = await bookingsModel.findByIdAndDelete(id);

      if (!deletedBooking) {
        return res.status(404).json({ message: `Cannot find any bookings with ID ${id}` });
      }

      res.status(200).json(deletedBooking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  searchBookingsByArea: async (req, res) => {
    try {
      const { area } = req.params;
      if (!area) {
        return res.status(400).json({ message: 'Area parameter is required' });
      }
      
      const bookings = await bookingsModel.find({ area });
      console.log(bookings);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  searchBookingsByAreaAndLocation: async (req, res) => {
    try {
      const { area, location } = req.params;

      if (!area || !location) {
        return res.status(400).json({ message: 'Both area and location parameters are required' });
      }

      const bookings = await bookingsModel.find({ area, Location: location });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

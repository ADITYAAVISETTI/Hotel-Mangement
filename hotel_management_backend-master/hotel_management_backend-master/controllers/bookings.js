const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../model/booking');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = {
  createBooking: async (req, res) => {
    try {
      const booking = req.body;
      const createdBooking = await Booking.create(booking);
      res.status(201).json(createdBooking);
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).send('Error creating booking');
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({});
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const bookingId = req.params._id;
      const booking = await Booking.findById(bookingId);
      
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json(booking);
        console.log("Booking found");
      }
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
      res.status(500).json({ message: error.message });
    }
  },
  getBookingByName: async (req, res) => {
    try {
      const name = req.params.name;
      const booking = await Booking.find({ username: name });
      console.log(booking);
      if (!booking || booking.length === 0) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json(booking);
        console.log("Booking found");
      }
    } catch (error) {
      console.error("Error fetching booking by name:", error);
      res.status(500).json({ message: error.message });
    }
  },

  updateBookingById: async (req, res) => {
    try {
      const bookingId = req.params._id;
      const updateData = req.body;
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updateData, { new: true });

      if (!updatedBooking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json({updatedBooking});
        console.log("Booking updated successfully");
      }
    } catch (error) {
      console.error("Error updating booking by ID:", error);
      res.status(500).json({ message: error.message });
    }
  },

  deleteBookingById: async (req, res) => {
    try {
      const bookingId = req.params.BookingId;
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);

      if (!deletedBooking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json({ message: 'Booking deleted' });
      }
    } catch (error) {
      console.error("Error deleting booking by ID:", error);
      res.status(500).json({ message: error.message });
    }
  }
};

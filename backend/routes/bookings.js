const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:name', bookingController.getBookingByName);
router.get('/bookings/:_id', bookingController.getBookingById);
router.put('/bookings/:_id', bookingController.updateBookingById);
router.delete('/bookings/:BookingId', bookingController.deleteBookingById);

module.exports = router;

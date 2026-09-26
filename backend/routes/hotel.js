const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/hotel');

router.post('/hotel', bookingsController.createBookings);
router.get('/hotel', bookingsController.getAllbookings);
router.get('/hotel/:id', bookingsController.getbookingsById);
router.put('/hotel/:id', bookingsController.updatebookings);
router.delete('/hotel/:id', bookingsController.deletebookings);
router.get('/hotel/search/:area/:location',bookingsController.searchBookingsByAreaAndLocation);
router.get('/hotel/search/:area', bookingsController.searchBookingsByArea);

module.exports = router;

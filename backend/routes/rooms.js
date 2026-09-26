const express = require('express');
const route = express.Router();

const roomsController = require('../controllers/rooms')

route.get('/rooms',roomsController.getAllrooms);
route.post('/rooms',roomsController.createRoom);
route.put('/rooms/:room_id',roomsController.UpdateRoom);
route.get('/rooms/:room_id',roomsController.getRoomById);
route.delete('/rooms/:room_id',roomsController.deleteRoom);
route.get('/:hotelname/rooms', roomsController.getRoomsByHotel);
route.get('/rooms/:location/:hotelname', roomsController.getRoomsByHotelAndLocation);
route.get('/rooms/:location/:hotelName/:roomType', roomsController.getPrice);
module.exports = route;
const express = require('express');
const router = express.Router();

const {addBooking}=require('../controllers/bookingsController.js');



router.post('/addBooking', addBooking);
//router.get('/getBookings', getBookings);


module.exports = router;
const jwt = require('jsonwebtoken');
const Booking = require('../models/Bookings');

const addBooking = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_jwt_secret' with your actual secret
    const userEmail = decoded.user.email; // Get user email from decoded token

    const { name, game, date, timeSlot } = req.body;
    console.log("decoded", decoded );

    // Log incoming data to debug
    console.log('Booking data received:', { name, game, date, timeSlot, email: userEmail });

    // Check if a booking already exists for this game, date, and time slot
    const existingBooking = await Booking.findOne({ game, date, timeSlot });
    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot is already taken.' });
    }

    // Create new booking
    const newBooking = new Booking({
      name,
      game,
      date,
      timeSlot,
      email: userEmail, // Save email from token
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    console.error('Error adding booking:', error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addBooking };

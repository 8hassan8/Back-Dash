const Booking = require('../models/Bookings');

const addBooking = async (req, res) => {
  try {
    const { name, game, date, timeSlot } = req.body;

    // Log incoming data to debug
    console.log('Booking data received:', { name, game, date, timeSlot });

    // Check if a booking already exists for this game, date, and time slot
    const existingBooking = await Booking.findOne({ game, date, timeSlot });
    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot is already taken.' });
    }

    // Create new booking
    const newBooking = new Booking({ name, game, date, timeSlot });
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    console.error('Error adding booking:', error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addBooking };

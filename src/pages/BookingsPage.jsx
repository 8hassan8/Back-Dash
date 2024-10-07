import React, { useState } from 'react';
import axios from 'axios';
import './bookingsPage.css';

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    game: '',
    date: '',
    timeSlots: [], // Initialize as an array
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeSlotChange = (e) => {
    const { value, checked } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      timeSlots: checked
        ? [...prevData.timeSlots, value]
        : prevData.timeSlots.filter((slot) => slot !== value),
    }));
  };

  const timeSlots = [
    '12 PM - 1 PM',
    '1 PM - 2 PM',
    '2 PM - 3 PM',
    '3 PM - 4 PM',
    '4 PM - 5 PM',
    '5 PM - 6 PM',
    '6 PM - 7 PM',
    '7 PM - 8 PM',
    '8 PM - 9 PM',
    '9 PM - 10 PM',
    '10 PM - 11 PM',
    '11 PM - 12 AM',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (bookingData.timeSlots.length === 0) {
      setError('Please select at least one time slot.');
      setIsSubmitting(false);
      return;
    }

    // Log the data before sending
    console.log('Booking data to be sent:', bookingData);

    try {
      const response = await axios.post('http://localhost:5000/api/bookings/addBooking', {
        name: bookingData.name,
        game: bookingData.game,
        date: bookingData.date,
        timeSlot: bookingData.timeSlots,
      });

      console.log(response.data);
      // Handle successful booking response
    } catch (err) {
      setError('Failed to book slot. Please try again.');
      console.error(err); // Log the error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 border-2 border-red-700 rounded-lg bg-black text-red-700"
      >
        <h2 className="text-2xl font-bold mb-4">Book Your Slot</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border-2 border-red-700 bg-black text-white focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Game</label>
          <input
            type="text"
            name="game"
            value={bookingData.game}
            onChange={handleChange}
            className="w-full p-2 rounded border-2 border-red-700 bg-black text-white focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={bookingData.date}
            onChange={handleChange}
            className="w-full p-2 rounded border-2 border-red-700 custom-date-picker"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Available Time Slots</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`slot-${index}`}
                  value={slot}
                  onChange={handleTimeSlotChange}
                  className="mr-2"
                />
                <label htmlFor={`slot-${index}`} className="text-white">
                  {slot}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded bg-red-700 text-white ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Book Slot'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;

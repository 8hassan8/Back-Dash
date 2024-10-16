import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm'; // Import PaymentForm component
import './bookingsPage.css';

// Stripe publishable key
const stripePromise = loadStripe('pk_test_51QAAMPFjMTY7K7S1tR0KfsIbZznMrXsgwJcBXxR4GW9ztZJbzv63NP1SPz73zmYxonYHuazZqIqG8TCfHPpscUdo00EDjK4U5e');

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    game: '',
    date: '',
    timeSlots: [],
    email: '', // Add email field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null); // Stripe payment intent

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if (token && user) {
      const decodedToken = jwtDecode(token);
      setBookingData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, []);

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
    '12 PM - 1 PM', '1 PM - 2 PM', '2 PM - 3 PM', '3 PM - 4 PM',
    '4 PM - 5 PM', '5 PM - 6 PM', '6 PM - 7 PM', '7 PM - 8 PM',
    '8 PM - 9 PM', '9 PM - 10 PM', '10 PM - 11 PM', '11 PM - 12 AM',
  ];

  // Fetch payment intent client secret from backend
  const createPaymentIntent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: 5000, // Example amount in cents ($50.00)
      });
      setPaymentIntentClientSecret(response.data.clientSecret); // Store the client secret from backend
    } catch (err) {
      setError('Error creating payment intent');
      console.error(err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (bookingData.timeSlots.length === 0) {
      setError('Please select at least one time slot.');
      setIsSubmitting(false);
      return;
    }

    // Create the payment intent before sending booking data
    await createPaymentIntent();

    // Send booking details to backend after creating the payment intent
    const token = sessionStorage.getItem('token');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));

    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings/addBooking',
        {
          name: bookingData.name,
          game: bookingData.game,
          date: bookingData.date,
          timeSlot: bookingData.timeSlots,
          email: storedUser.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Booking submitted:', response.data);
      setBookingData(response.data.booking); // Update bookingData with the response booking data
    } catch (err) {
      setError('Failed to book slot. Please try again.');
      console.error(err);
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
            className="w-full p-2 rounded border-2 border-red-700 bg-black text-white"
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
            className="w-full p-2 rounded border-2 border-red-700 bg-black text-white"
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
            className="w-full p-2 rounded border-2 border-red-700"
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

        {/* Submit button */}
        <button
          type="submit"
          className={`w-full p-2 rounded bg-red-700 text-white ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Book Slot'}
        </button>

        {/* Show Stripe payment form after creating payment intent */}
        {paymentIntentClientSecret && (
          <Elements stripe={stripePromise}>
            <PaymentForm
              clientSecret={paymentIntentClientSecret}
              bookingData={bookingData} // Pass bookingData to PaymentForm
              onPaymentSuccess={() => console.log('Payment Successful')}
              onPaymentError={(err) => setError(err.message)}
            />
          </Elements>
        )}
      </form>
    </div>
  );
};

export default BookingPage;

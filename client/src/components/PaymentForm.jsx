import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ bookingData, onBookingSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
  
    console.log("Booking Data:", bookingData); // Add this line to check if bookingData is passed
  
    const handlePaymentSubmit = async (e) => {
      e.preventDefault(); // This will now be called in the outer form
  
      setIsProcessing(true);
      setPaymentError(null);
  
      try {
        const { data } = await axios.post('http://localhost:5000/api/payments/create-payment-intent', {
          amount: 50, // Replace with the actual booking price
        });
  
        const { clientSecret } = data;
        const cardElement = elements.getElement(CardElement);
  
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
  
        if (paymentResult.error) {
          setPaymentError(paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
          await onBookingSuccess();
        }
      } catch (error) {
        setPaymentError('Payment failed, please try again.');
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    };
  
    return (
      <div>
        <CardElement />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full p-2 rounded bg-red-700 text-white ${isProcessing && 'opacity-50 cursor-not-allowed'}`}
        >
          {isProcessing ? 'Processing...' : 'Pay and Book Slot'}
        </button>
        {paymentError && <div className="text-red-500 mt-4">{paymentError}</div>}
      </div>
    );
  };

export default PaymentForm;

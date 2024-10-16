const stripe = require('stripe')('sk_test_51QAAMPFjMTY7K7S11EWImY9QX5zhxGUS6SrMyTwsUkWCiyRcli96lN16XXAIRxV9nOQbiYGeiYd5wa6XKceONUoz00oUWta72S'); // Add your Stripe key

const handleStripePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe processes in the smallest currency unit, e.g., cents for USD
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe payment error:', error);
    res.status(500).send({ error: 'Payment failed' });
  }
};

module.exports = { handleStripePayment };
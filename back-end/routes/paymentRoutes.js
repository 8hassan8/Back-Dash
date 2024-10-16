const express = require('express');
const router = express.Router();
const { handleStripePayment } = require('../controllers/paymentController');

router.post('/create-payment-intent', handleStripePayment);

module.exports = router;
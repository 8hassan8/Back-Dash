// models/ContactInfo.js
const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  mapUrl: { type: String, required: true }, // URL for the Google Maps iframe
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
  },
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
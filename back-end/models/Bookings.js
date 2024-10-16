const e = require("express");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: [String], required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);

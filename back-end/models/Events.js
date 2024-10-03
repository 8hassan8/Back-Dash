const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    game: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: Buffer, required: true }  // Correct way to define Buffer type
});

module.exports = mongoose.model('Event', EventsSchema);  // export the model with the name 'Game' and the schema 'GamesSchema'

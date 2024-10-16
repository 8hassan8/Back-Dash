const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,  // Store date as string (YYYY-MM-DD)
    game: String,
    time: String,
    location: String,
    image: Buffer
});

module.exports = mongoose.model('Event', EventsSchema);  // export the model with the name 'Game' and the schema 'GamesSchema'

const mongoose = require('mongoose');

const GamesSchema = new mongoose.Schema({
    title: { type: String, required: true, Uique: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: true }  // Correct way to define Buffer type
});

module.exports = mongoose.model('Game', GamesSchema);  // export the model with the name 'Game' and the schema 'GamesSchema'

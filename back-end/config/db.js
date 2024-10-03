
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI=process.env.MONGO_URI;

const connectDB = async () =>{
    try {
        mongoose.connect(mongoURI)
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
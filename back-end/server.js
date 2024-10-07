const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const app=express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // If you're using cookies or auth headers
  }));

mongoURI=process.env.MONGO_URI;

connectDB();

// Importing the routes
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/admins',require('./routes/adminRoutes'));
app.use('/api/games',require('./routes/gamesRoutes'));
app.use('/api/events',require('./routes/eventsRoutes'));
app.use('/api/bookings',require('./routes/bookingsRoutes'));
app.use('/api/contact',require('./routes/contactRoutes'));


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)); 

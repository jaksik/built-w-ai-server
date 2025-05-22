const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Check if environment variables are loaded
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Environment variables:', {
      MONGODB_URI: process.env.MONGODB_URI ? 'Found' : 'Not found',
      PORT: process.env.PORT
    });
  });

// Routes
const articleRoutes = require('./routes/articles');
app.use('/api/articles', articleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

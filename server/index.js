const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin
require('./firebaseAdmin');

const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Dolphin Xerox API is Running...');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Optional Fallback)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dolphin_xerox')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error (Mock mode active):', err.message);
  });

// Always start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

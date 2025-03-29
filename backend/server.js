// Load environment variables if available
try {
  require('dotenv').config();
} catch (error) {
  console.log('No .env file found, using environment variables');
}

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');

// Connect to Database
connectDB();

// Create Express App
const app = express();

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['https://digital-library-system.vercel.app','http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "production"} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

module.exports = app;
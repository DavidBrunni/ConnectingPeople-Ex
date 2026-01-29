const mongoose = require('mongoose');

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/connecting-people');
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('Server starting without database. Start MongoDB or set MONGODB_URI to use auth/profile.');
  }
}

module.exports = { connectDB };

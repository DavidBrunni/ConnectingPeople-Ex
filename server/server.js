const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Connecting People API is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
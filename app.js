const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authenticateToken = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes public
app.use('/api/auth', require('./routes/auth.routes'));

// Routes protected pakai middleware
// app.use('/api/jadwals', authenticateToken, require('./routes/jadwal.routes'));
// app.use('/api/bookings', authenticateToken, require('./routes/booking.routes'));

console.log('Starting server...');

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

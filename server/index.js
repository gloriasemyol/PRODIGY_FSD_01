const requireRole = require('./middleware/requireRole');
const authenticateToken = require('./middleware/auth');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const pool = require('./db/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}!`, role: req.user.role });
});

// Test route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/admin-only', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin! This is a secret admin route.' });
});
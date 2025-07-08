const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email dan password wajib diisi' });

  try {
    const user = await User.findUserByEmail(email);

    if (!user) return res.status(401).json({ message: 'Email atau password salah' });

    if (user.password !== password) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
module.exports = { login };

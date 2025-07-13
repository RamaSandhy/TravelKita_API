const express = require('express');
const router = express.Router();
const db = require('../db');

// Tambah data booking
router.post('/add', (req, res) => {
  const { user_id, jadwal_id, nama_penumpang, jumlah_tiket, total_harga } = req.body;

  const sql = `INSERT INTO booking_details (user_id, jadwal_id, nama_penumpang, jumlah_tiket, total_harga)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [user_id, jadwal_id, nama_penumpang, jumlah_tiket, total_harga], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking berhasil', id: result.insertId });
  });
});

// Ambil riwayat booking berdasarkan user
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT b.*, j.asal, j.tujuan, j.tanggal, j.waktu
    FROM booking_details b
    JOIN jadwals j ON j.id = b.jadwal_id
    WHERE b.user_id = ? ORDER BY b.tanggal_pemesanan DESC`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;

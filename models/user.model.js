const pool = require('../db');

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
}

module.exports = { findUserByEmail };

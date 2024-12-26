const db = require('../config/db');

const Account = {
  create: (email, password, callback) => {
    const query = 'INSERT INTO accounts (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM accounts WHERE email = ? LIMIT 1';
    db.query(query, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, null);
      }
    });
  },
};

module.exports = Account;

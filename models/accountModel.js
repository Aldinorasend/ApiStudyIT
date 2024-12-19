const db = require('../config/db');

const Account = {
  create: (email, hashedPassword, callback) => {
    const query = 'INSERT INTO account (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Account;

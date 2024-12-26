const db = require('../config/db');

const createAccount = async (data) => {
  const sql = `INSERT INTO accounts (username, firstname, lastname, phonenumber, email, password, regist_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    // Cek apakah email atau username sudah ada
    const existingAccount = await getAccountByEmailorUsername(data.email);
    if (existingAccount) {
      throw new Error('Email or username already in use.');
    }

    const [result] = await db.query(sql, [
      data.username,
      data.firstname,
      data.lastname,
      data.phonenumber,
      data.email,
      data.password,
      data.regist_date,
    ]);
    return result;
  } catch (err) {
    console.error('Error creating account', err.message);
    throw err;
  }
};

const getAccountByEmailorUsername = async (emailOrUsername) => {
  const sql = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  try {
    const [results] = await db.query(sql, [emailOrUsername, emailOrUsername]);
    return results[0]; // Mengembalikan hanya satu akun
  } catch (err) {
    console.error('Error retrieving account:', err.message);
    throw err;
  }
};

module.exports = {
  createAccount,
  getAccountByEmailorUsername,
};



// const Account = {
//   create: (email, password, callback) => {
//     const query = 'INSERT INTO accounts (email, password) VALUES (?, ?)';
//     db.query(query, [email, password], (err, results) => {
//       if (err) {
//         return callback(err, null);
//       }
//       callback(null, results);
//     });
//   },

//   findByEmail: (email, callback) => {
//     const query = 'SELECT * FROM accounts WHERE email = ? LIMIT 1';
//     db.query(query, [email], (err, results) => {
//       if (err) {
//         return callback(err, null);
//       }
//       if (results.length > 0) {
//         callback(null, results[0]);
//       } else {
//         callback(null, null);
//       }
//     });
//   },
// };
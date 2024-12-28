const db = require('../config/db');

const getAllAccounts = async () => {
  const sql = 'SELECT * FROM accounts';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

const createAccount = async (data) => {
  const sql = 'INSERT INTO accounts SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAccountByEmailorUsername = async (email, username) => {
  const sql = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  try {
    const [results] = await db.query(sql, [email, username]);
    return results[0] || null; // Pastikan hanya satu hasil dikembalikan
  } catch (err) {
    throw err;
  }
};


const updateAccount = async (id, data) => {
  const sql = 'UPDATE accounts SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const deleteAccount = async (id) => {
  const sql = 'DELETE FROM accounts WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllAccounts, createAccount, getAccountByEmailorUsername, updateAccount, deleteAccount
}
// const createAccount = async (data) => {
//   const sql = `INSERT INTO accounts (username, firstname, lastname, phonenumber, email, password, regist_date) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//   try {
//     // Cek apakah email atau username sudah ada
//     const existingEmail = await getAccountByEmailorUsername(data.email);

//     if (existingEmail) {
//       throw new Error('Email already in use.');
//     }

//     const [result] = await db.query(sql, [
//       data.username,
//       data.firstname,
//       data.lastname,
//       data.phonenumber,
//       data.email,
//       data.password,
//       data.regist_date
//     ]);
//     return result;
//   } catch (err) {
//     console.error('Error creating account', err.message);
//     throw err;
//   }
// };

// const getAccountByEmailorUsername = async (emailOrUsername) => {
//   const sql = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
//   try {
//     const [results] = await db.query(sql, [emailOrUsername, emailOrUsername]);
//     return results[0]; // Mengembalikan hanya satu akun
//   } catch (err) {
//     console.error('Error retrieving account:', err.message);
//     throw err;
//   }
// };

// module.exports = {
//   createAccount,
//   getAccountByEmailorUsername,
// };
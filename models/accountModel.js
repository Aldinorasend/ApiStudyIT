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

const getStudentAccounts = async () => {
  const sql = 'SELECT * FROM accounts WHERE User_Type ="Free" OR User_Type ="Subscriber"';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};
const getIdAccounts = async (id) => {
  const sql = 'SELECT * FROM accounts where id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const getProfilesModel = async (user_id) => {
  const sql = 'SELECT * FROM profiles where user_id = ?';
  try {
    const [results] = await db.query(sql, [user_id]);
    return results[0];
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

const updateAccount2FA = async (id, twofa_secret) => {
  const sql = 'UPDATE accounts SET twofa_secret = ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [twofa_secret, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const remove2FASecret = async (id) => {
  const sql = 'UPDATE accounts SET twofa_secret = NULL WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
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

const saveResetToken = async (email, token, expiry) => {
  const sql = 'UPDATE accounts SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
  try {
    const [result] = await db.query(sql, [token, expiry, email]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getAccountByResetToken = async (token) => {
  const sql = 'SELECT * FROM accounts WHERE reset_token = ? AND reset_token_expiry > NOW()';
  try {
    const [results] = await db.query(sql, [token]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

const verifyOTP = async (email, otp) => {
  const sql = 'SELECT * FROM accounts WHERE email = ? AND otp = ? AND otp_expiry > NOW()';
  try {
    const [results] = await db.query(sql, [email, otp]);
    return results[0] || null;
  } catch (err) {
    throw err;
  }
};

const activateAccount = async (email) => {
  const sql = 'UPDATE accounts SET User_Type = "Free", otp = NULL, otp_expiry = NULL, is_verified = TRUE WHERE email = ?';
  try {
    const [result] = await db.query(sql, [email]);
    return result;
  } catch (err) {
    throw err;
  }
};

const updateOTP = async (email, otp, expiry) => {
  const sql = 'UPDATE accounts SET otp = ?, otp_expiry = ? WHERE email = ?';
  try {
    await db.query(sql, [otp, expiry, email]);
  } catch (err) {
    throw err;
  }
};

module.exports = {

  getAllAccounts,getIdAccounts, createAccount, getAccountByEmailorUsername, updateAccount, deleteAccount, saveResetToken, getAccountByResetToken, updateAccount2FA, remove2FASecret, verifyOTP, activateAccount, updateOTP, getStudentAccounts
}


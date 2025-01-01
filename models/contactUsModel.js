const db = require('../config/db');

// Mendapatkan semua contact_us
const getAllContactUs = async () => {
  const sql = 
  `SELECT * FROM contact_us`;
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan contact_us baru
const createContactUs = async (data) => {
  const sql = 'INSERT INTO contact_us SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan contact_us berdasarkan ID
const getContactUsById = async (id) => {
  const sql = `SELECT * FROM contact_us WHERE id = ?`;
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

// Mengupdate contact_us
const updateContactUs = async (id, data) => {
  const sql = 'UPDATE contact_us SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus contact_us
const deleteContactUs = async (id) => {
  const sql = 'DELETE FROM contact_us WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllContactUs, createContactUs, getContactUsById, updateContactUs, deleteContactUs };

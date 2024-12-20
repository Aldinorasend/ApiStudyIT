const db = require('../config/db');

// Mendapatkan semua item
const getAllItems = async () => {
  const sql = 'SELECT * FROM items';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan item baru
const createItem = async (data) => {
  const sql = 'INSERT INTO items SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan item berdasarkan ID
const getItemById = async (id) => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu item
  } catch (err) {
    throw err;
  }
};

// Mengupdate item
const updateItem = async (id, data) => {
  const sql = 'UPDATE items SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus item
const deleteItem = async (id) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllItems, createItem, getItemById, updateItem, deleteItem };

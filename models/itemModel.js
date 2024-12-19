const db = require('../config/db');

// Mendapatkan semua item
const getAllItems = (callback) => {
  const sql = 'SELECT * FROM items';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Menambahkan item baru
const createItem = (data, callback) => {
  const sql = 'INSERT INTO items SET ?';
  db.query(sql, data, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Mendapatkan item berdasarkan ID
const getItemById = (id, callback) => {
  const sql = 'SELECT * FROM items WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Mengupdate item
const updateItem = (id, data, callback) => {
  const sql = 'UPDATE items SET ? WHERE id = ?';
  db.query(sql, [data, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Menghapus item
const deleteItem = (id, callback) => {
  const sql = 'DELETE FROM items WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = { getAllItems, createItem, getItemById, updateItem, deleteItem };

const db = require('../config/db');

// Mendapatkan semua modul
const getAllModuls = async () => {
  const sql = 'SELECT * FROM moduls';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan modul baru
const createModul = async (data) => {
  const sql = 'INSERT INTO moduls SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan modul berdasarkan ID
const getModulById = async (id) => {
  const sql = 'SELECT * FROM moduls WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu modul
  } catch (err) {
    throw err;
  }
};

const getModulByIdCourse = async (CourseID) => {
  const sql = 'SELECT * FROM moduls WHERE CourseID = ?';
  try {
    const [results] = await db.query(sql, [CourseID]);
    return results[0]; // Mengembalikan hanya satu modul
  } catch (err) {
    throw err;
  }
};

// Mengupdate modul
const updateModul = async (id, data) => {
  const sql = 'UPDATE moduls SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus modul
const deleteModul = async (id) => {
  const sql = 'DELETE FROM moduls WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllModuls, createModul, getModulById,getModulByIdCourse, updateModul, deleteModul };

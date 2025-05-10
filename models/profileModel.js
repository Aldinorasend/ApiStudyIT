const db = require('../config/db');

// Mendapatkan semua instructor
const getAllInstructors = async (limit, offset) => {
  const sql = 'SELECT * FROM instructors LIMIT ? OFFSET ?';
  try {
    const [results] = await db.query(sql, [limit, offset]);
    return results;
  } catch (err) {
    throw err;
  }
};

const getTotalInstructors = async () => {
  const sql = 'SELECT COUNT(*) as total FROM instructors';
  try {
    const [results] = await db.query(sql);
    return results[0].total;
  } catch (err) {
    throw err;
  }
};

// Menambahkan instructor baru
const createInstructor = async (data) => {
  const sql = 'INSERT INTO instructors SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan instructor berdasarkan ID
const getInstructorById = async (id) => {
  const sql = 'SELECT * FROM instructors WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu instructor
  } catch (err) {
    throw err;
  }
};

// Mengupdate instructor
const updateInstructor = async (id, data) => {
  const sql = 'UPDATE instructors SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus instructor
const deleteInstructor = async (id) => {
  const sql = 'DELETE FROM instructors WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllInstructors, getTotalInstructors, createInstructor, getInstructorById, updateInstructor, deleteInstructor };

const db = require('../config/db');

// Mendapatkan semua discussion
const getAllDiscussions = async () => {
  const sql = 'SELECT * FROM modul_discussions';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan discussion baru
const createDiscussion = async (data) => {
  const sql = 'INSERT INTO modul_discussions SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan discussion berdasarkan ID
const getDiscussionById = async (id) => {
  const sql = 'SELECT * FROM modul_discussions WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu discussion
  } catch (err) {
    throw err;
  }
};

const getDiscussionByIdCourse = async (CourseID) => {
  const sql = 'SELECT * FROM modul_discussions WHERE CourseID = ?';
  try {
    const [results] = await db.query(sql, [CourseID]);
    return results[0]; // Mengembalikan hanya satu discussion
  } catch (err) {
    throw err;
  }
};

// Mengupdate discussion
const updateDiscussion = async (id, data) => {
  const sql = 'UPDATE modul_discussions SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus discussion
const deleteDiscussion = async (id) => {
  const sql = 'DELETE FROM modul_discussions WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllDiscussions, createDiscussion, getDiscussionById,getDiscussionByIdCourse, updateDiscussion, deleteDiscussion };

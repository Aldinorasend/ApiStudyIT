const db = require('../config/db');

// Mendapatkan semua reply
const getAllReplys = async () => {
  const sql = 'SELECT * FROM discussion_replies';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan reply baru
const createReply = async (data) => {
  const sql = 'INSERT INTO discussion_replies SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// Mendapatkan reply berdasarkan ID
const getReplyById = async (id) => {
  const sql = 'SELECT * FROM discussion_replies WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu reply
  } catch (err) {
    throw err;
  }
};

const getReplyByIdCourse = async (CourseID) => {
  const sql = 'SELECT * FROM discussion_replies WHERE CourseID = ?';
  try {
    const [results] = await db.query(sql, [CourseID]);
    return results[0]; // Mengembalikan hanya satu reply
  } catch (err) {
    throw err;
  }
};

// Mengupdate reply
const updateReply = async (id, data) => {
  const sql = 'UPDATE discussion_replies SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus reply
const deleteReply = async (id) => {
  const sql = 'DELETE FROM discussion_replies WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { getAllReplys, createReply, getReplyById,getReplyByIdCourse, updateReply, deleteReply };

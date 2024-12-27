const db = require('../config/db');

// Mendapatkan semua courses
const getAllCourses = async () => {
  const sql = `
    SELECT courses.*, instructors.firstname, instructors.lastname 
    FROM courses
    LEFT JOIN instructors ON courses.instructor_id = instructors.id
  `;
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan course baru
const createCourse = async (data) => {
  const sql = 'INSERT INTO courses SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};


// Mendapatkan course berdasarkan ID
const getCourseById = async (id) => {
  const sql = `
    SELECT courses.*, instructors.firstname, instructors.lastname 
    FROM courses
    LEFT JOIN instructors ON courses.instructor_id = instructors.id
    WHERE courses.id = ?
  `;
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

// Mengupdate course
const updateCourse = async (id, data) => {
  const sql = 'UPDATE courses SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus course
const deleteCourse = async (id) => {
  const sql = 'DELETE FROM courses WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getPhotoPathById = async (id) => {
  const sql = 'SELECT image FROM courses WHERE id = ?';
  try {
    const [rows] = await db.query(sql, [id]);
    return rows.length > 0 ? rows[0].image : null;
  } catch (err) {
    throw err;
  }
};
module.exports = { getAllCourses, createCourse, getCourseById, updateCourse, deleteCourse, getPhotoPathById };
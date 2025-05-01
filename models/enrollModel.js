const db = require('../config/db');

// Mendapatkan semua enrolls
const getStudentsEnrolls = async (UserID) => {
  const sql = `
    SELECT 
    enrollments.id,
    accounts.firstname AS Students_FirstName, 
    accounts.lastname AS Students_LastName,
    courses.course_name AS Courses_Name, 
    instructors.firstname AS Instructors_FirstName, 
    instructors.lastname AS Instructors_LastName,
    enrollments.Progress
        FROM enrollments
        LEFT JOIN accounts ON enrollments.UserID = accounts.id  
        LEFT JOIN courses ON enrollments.CourseID = courses.id  
        LEFT JOIN instructors ON courses.instructor_id = instructors.id  
    WHERE enrollments.UserID = ?
  `;
  try {
    const [results] = await db.query(sql, [UserID]);
    return results;
  } catch (err) {
    throw err;
  }
}
const getAllEnrolls = async () => {
  const sql = `
    SELECT enrolls.*, accounts.firstname, accounts.lastname 
    FROM enrolls
    LEFT JOIN accounts ON enrolls.user_id = accounts.id
  `;
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan enroll baru
const createEnroll = async (data) => {
  const sql = 'INSERT INTO enrolls SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};


// Mendapatkan enroll berdasarkan ID
const getEnrollById = async (id) => {
  const sql = `
    SELECT enrolls.*, accounts.firstname, accounts.lastname 
    FROM enrolls
    LEFT JOIN accounts ON enrolls.user_id = accounts.id
    WHERE enrolls.id = ? 
  `;
  try {
    const [results] = await db.query(sql, [id]);
    return results[0];
  } catch (err) {
    throw err;
  }
};

// Mengupdate enroll
const updateEnroll = async (id, data) => {
  const sql = 'UPDATE enrolls SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus enroll
const deleteEnroll = async (id) => {
  const sql = 'DELETE FROM enrolls WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};
module.exports = { getAllEnrolls, getStudentsEnrolls, createEnroll, getEnrollById, updateEnroll, deleteEnroll};

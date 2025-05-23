const db = require('../config/db');

// Mendapatkan semua task
const getAllTasks = async () => {
  const sql = 'SELECT * FROM tasks';
  try {
    const [results] = await db.query(sql);
    return results;
  } catch (err) {
    throw err;
  }
};

// Menambahkan task baru
const createTask = async (data) => {
  const sql = 'INSERT INTO tasks SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};
const getTaskByEnrollId = async (EnrollID, ModulID) => {
  const sql = `SELECT 
      tasks.id,
      courses.course_name AS Courses_Name, 
      accounts.firstname AS Students_FirstName, 
      accounts.lastname AS Students_LastName,
      moduls.Title AS Modul_Name,
      tasks.FileTask,
      tasks.Status,
      tasks.SubmittedAt
    FROM tasks
    LEFT JOIN moduls ON tasks.ModulID = moduls.id  
    LEFT JOIN courses ON moduls.CourseID = courses.id 
    LEFT JOIN enrollments ON tasks.EnrollID = enrollments.id
    LEFT JOIN accounts ON enrollments.UserID = accounts.id  
    WHERE enrollments.id = ? AND tasks.ModulID = ?`;
  try {
    const [results] = await db.query(sql, [EnrollID, ModulID]);
    return results; // Mengembalikan hanya satu task
  } catch (err) {
    throw err;
  }
};
const getTaskByUserId = async (UserID, CourseID) => {
  const sql = `SELECT 
      tasks.id,
      courses.course_name AS Courses_Name, 
      accounts.firstname AS Students_FirstName, 
      accounts.lastname AS Students_LastName,
      moduls.Title AS Modul_Name,
      tasks.FileTask,
      tasks.Status
    FROM tasks
    LEFT JOIN moduls ON tasks.ModulID = moduls.id  
    LEFT JOIN courses ON moduls.CourseID = courses.id 
    LEFT JOIN enrollments ON tasks.EnrollID = enrollments.id
    LEFT JOIN accounts ON enrollments.UserID = accounts.id  
    WHERE enrollments.UserID = ? AND enrollments.CourseID = ?`;
  try {
    const [results] = await db.query(sql, [UserID, CourseID]);
    return results; // Mengembalikan hanya satu task
  } catch (err) {
    throw err;
  }
};

const ApproveTask = async (id) => {
  const sql = 'UPDATE tasks SET Status = "Completed" WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};
// Mendapatkan task berdasarkan ID
const getTaskById = async (id) => {
  const sql = 'SELECT * FROM tasks WHERE id = ?';
  try {
    const [results] = await db.query(sql, [id]);
    return results[0]; // Mengembalikan hanya satu task
  } catch (err) {
    throw err;
  }
};

const getTaskByIdCourse = async (CourseID) => {
  const sql = 'SELECT * FROM tasks WHERE CourseID = ?';
  try {
    const [results] = await db.query(sql, [CourseID]);
    return results[0]; // Mengembalikan hanya satu task
  } catch (err) {
    throw err;
  }
};

// Mengupdate task
const updateTask = async (id, data) => {
  const sql = 'UPDATE tasks SET ? WHERE id = ?';
  try {
    const [result] = await db.query(sql, [data, id]);
    return result;
  } catch (err) {
    throw err;
  }
};

// Menghapus task
const deleteTask = async (id) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  try {
    const [result] = await db.query(sql, [id]);
    return result;
  } catch (err) {
    throw err;
  }
};

const getPhotoPathByID = async (id) => {
  const sql = 'SELECT FileTask FROM tasks WHERE id = ?';
  try {
    const [rows] = await db.query(sql, [id]);
    return rows.length > 0 ? rows[0].FileTask : null; // Ganti 'image' dengan 'FileTask'
  } catch (err) {
    throw err;
  }
};


module.exports = { 
  getAllTasks, createTask, getTaskById,getTaskByUserId,
  ApproveTask,getTaskByIdCourse, updateTask, deleteTask, 
  getPhotoPathByID, getTaskByEnrollId 
};

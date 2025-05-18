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
    enrollments.CourseID,
    enrollments.Progress
        FROM enrollments
        LEFT JOIN accounts ON enrollments.UserID = accounts.id  
        LEFT JOIN courses ON enrollments.CourseID = courses.id  
        LEFT JOIN instructors ON courses.instructor_id = instructors.id  
    WHERE enrollments.UserID = ? ORDER BY enrollments.CourseID ASC
  `;
  try {
    const [results] = await db.query(sql, [UserID]);
    return results;
  } catch (err) {
    throw err;
  }
}
const getStudentsEnrollsForUser = async (UserID) => {
  const sql = `
    SELECT 
    e.id,
    a.username AS Students_Username,
    a.firstname AS Students_FirstName,
    a.lastname AS Students_LastName,
    e.CourseID,
    c.course_name AS Courses_Name,
    c.level AS Courses_Level,
    c.status AS Courses_Status,
    c.image AS Courses_Image,
    e.Progress,
    (SELECT COUNT(*) 
     FROM enrollments e2 
     JOIN courses c2 ON e2.CourseID = c2.id 
     WHERE e2.UserID = e.UserID 
     AND c2.status = 'active' 
     AND c2.end_date >= CURDATE()
     AND e2.Progress < 100) AS total_upcoming_incomplete_courses,
      (SELECT COUNT(*) 
     FROM enrollments e3
     JOIN courses c3 ON e3.CourseID = c3.id
     WHERE e3.UserID = e.UserID
     AND c3.status = 'active') AS total_active_courses,
     ROUND(
      (SELECT SUM(e4.progress) / COUNT(e4.id)
     FROM enrollments e4 
      JOIN courses c4 ON e4.CourseID = c4.id
      WHERE e4.UserID = e.UserID
      AND c4.status = 'active') , 0)  AS average_progress
FROM 
    enrollments e
LEFT JOIN accounts a ON e.UserID = a.id  
LEFT JOIN courses c ON e.CourseID = c.id  
LEFT JOIN instructors i ON c.instructor_id = i.id  
WHERE 
    e.UserID = ?    AND c.status = 'active' 
ORDER BY 
    e.CourseID ASC;
  `;
  try {
    const [results] = await db.query(sql, [UserID]);
    return results;
  } catch (err) {
    throw err;
  }
}
const searchCourseModel = async (UserID, courseName) => {
  const sql = `
    SELECT 
    e.id,
    a.username AS Students_Username,
    e.CourseID,
    c.course_name AS Courses_Name,
    c.level AS Courses_Level,
    c.status AS Courses_Status,
    c.image AS Courses_Image,
    e.Progress,
    (SELECT COUNT(*) 
     FROM enrollments e2 
     JOIN courses c2 ON e2.CourseID = c2.id 
     WHERE e2.UserID = e.UserID 
     AND c2.status = 'active' 
     AND c2.end_date >= CURDATE()
     AND e2.Progress < 100) AS total_upcoming_incomplete_courses,
    (SELECT COUNT(*) 
     FROM enrollments e3
     JOIN courses c3 ON e3.CourseID = c3.id
     WHERE e3.UserID = e.UserID
     AND c3.status = 'active') AS total_active_courses,
    ROUND(
      (SELECT SUM(e4.progress) / COUNT(e4.id)
     FROM enrollments e4 
      JOIN courses c4 ON e4.CourseID = c4.id
      WHERE e4.UserID = e.UserID
      AND c4.status = 'active') , 0) AS average_progress
FROM 
    enrollments e
LEFT JOIN accounts a ON e.UserID = a.id  
LEFT JOIN courses c ON e.CourseID = c.id  
LEFT JOIN instructors i ON c.instructor_id = i.id  
WHERE 
    e.UserID = ? 
    AND c.status = 'active' 
    AND c.course_name LIKE CONCAT('%', ?, '%')
ORDER BY 
    e.CourseID ASC;
  `;
  try {
    const [results] = await db.query(sql, [UserID, courseName]);
    return results;
  } catch (err) {
    throw err;
  }
}
const getEnrollmentByCourseAndUser = async (UserID, CourseID) => {
  const sql = `
    SELECT * FROM enrollments 
    WHERE UserID = ? AND CourseID = ?
  `;
  try {
    const [results] = await db.query(sql, [UserID, CourseID]);
    return results;
  } catch (err) {
    throw err;
  }
};

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
  const sql = 'INSERT INTO enrollments SET ?';
  try {
    const [result] = await db.query(sql, data);
    return result;
  } catch (err) {
    throw err;
  }
};

// In enrollModel.js
const UpdatedProgress = async (UserID) => {
  const sql = `
    UPDATE enrollments e
    JOIN (
        SELECT 
            e.id AS enroll_id,
            COUNT(CASE WHEN t.Status = 'Completed' THEN 1 END) * 100.0 / 
            NULLIF(COUNT(t.id), 0) AS new_progress
        FROM enrollments e
        LEFT JOIN tasks t ON t.EnrollID = e.id
        LEFT JOIN moduls m ON t.ModulID = m.id
        WHERE e.UserID = ?
        GROUP BY e.id
    ) AS progress_calc ON e.id = progress_calc.enroll_id
    SET e.Progress = COALESCE(progress_calc.new_progress, 0)
    WHERE e.UserID = ?;
  `;
  try {
    const [result] = await db.query(sql, [UserID, UserID]);
    return result;
  } catch (err) {
    throw err;
  }
};
// Mendapatkan enroll berdasarkan ID
const getEnrollById = async (id) => {
  const sql = `
    SELECT enrollments.*, accounts.firstname, accounts.lastname 
    FROM enrollments
    LEFT JOIN accounts ON enrollments.UserID = accounts.id
    WHERE enrollments.id = ? 
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
const paymentReqModel = async (data) => {
  const sql = `
    INSERT INTO subscribers SET ?`;
  try {
    const [results] = await db.query(sql, data);
    console.log('Payment request inserted:', results);
    return results;
  } catch (err) {
    throw err;
  }
}
module.exports = { 
  getAllEnrolls, getStudentsEnrolls, getStudentsEnrollsForUser,UpdatedProgress,
  getEnrollmentByCourseAndUser ,createEnroll, getEnrollById, updateEnroll, 
  deleteEnroll,paymentReqModel, searchCourseModel 
};

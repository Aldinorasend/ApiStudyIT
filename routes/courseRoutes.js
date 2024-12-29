const express = require('express');
const {
  getCourses,
  addCourse,
  getCourse,
  editCourse,
  removeCourse,
  getFreeCoursesForFreeUser,
} = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', getCourses);
router.get('/freecourses', getFreeCoursesForFreeUser);        // GET semua course
router.post('/courses', addCourse);       // POST course baru
router.get('/courses/:id', getCourse);    // GET course berdasarkan ID
router.put('/courses/:id', editCourse);   // PUT untuk update course
router.delete('/courses/:id', removeCourse); // DELETE course

module.exports = router;

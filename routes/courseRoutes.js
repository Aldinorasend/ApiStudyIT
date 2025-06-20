const express = require('express');
const {
  getCourses,
  addCourse,
  getCourse,
  editCourse,
  removeCourse,
  getFreeCoursesForFreeUser,
  getCoursesForAdmin,
  getActiveCoursesForUser,
  getBySortEndDateFree,
  getBySortEndDateSubs,
  getRatingById,
  postRating
} = require('../controllers/courseController');

const router = express.Router();

router.get('/coursesUser', getActiveCoursesForUser);
router.get('/coursesSortedFree', getBySortEndDateFree);
router.get('/coursesSortedSubscriber', getBySortEndDateSubs);
router.post('/postRating', postRating)
router.get('/coursesAdmin', getCoursesForAdmin);
router.get('/freecourses', getFreeCoursesForFreeUser);        // GET semua course
router.post('/courses', addCourse);       // POST course baru
router.get('/courses/:id', getCourse);    // GET course berdasarkan ID
router.get('/coursesRating/:id', getRatingById);    // GET course berdasarkan ID

router.put('/courses/:id', editCourse);   // PUT untuk update course
router.put('/coursesAdmin/:id', removeCourse); // DELETE course

module.exports = router;

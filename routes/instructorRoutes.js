const express = require('express');
const {
  getInstructors,
  addInstructor,
  getInstructor,
  editInstructor,
  removeInstructor,
} = require('../controllers/instructorController');

const router = express.Router();

router.get('/instructors', getInstructors);        // GET semua instructor
router.post('/instructors', addInstructor);       // POST instructor baru
router.get('/instructors/:id', getInstructor);    // GET instructor berdasarkan ID
router.put('/instructors/:id', editInstructor);   // PUT untuk update instructor
router.delete('/instructors/:id', removeInstructor); // DELETE instructor

module.exports = router;

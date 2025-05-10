const express = require('express');
const {
  getModuls,
  addModul,
  getModul,
  editModul,
  removeModul,
  getModulsByCourseID
} = require('../controllers/modulController');

const router = express.Router();

router.get('/moduls', getModuls);        // GET semua modul
router.post('/moduls', addModul);       // POST modul baru
router.get('/moduls/:id', getModul);  
router.get('/modulsByCourseID/:CourseID', getModulsByCourseID);  // GET modul berdasarkan ID
router.put('/moduls/:id', editModul);   // PUT untuk update modul
router.delete('/moduls/:id', removeModul); // DELETE modul

module.exports = router;

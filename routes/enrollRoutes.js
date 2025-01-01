const express = require('express');
const {
  getEnrolls,
  addEnroll,
  getEnroll,
  editEnroll,
  removeEnroll,
} = require('../controllers/enrollController');

const router = express.Router();

router.get('/enrolls', getEnrolls);        // GET semua enroll
router.post('/enrolls', addEnroll);       // POST enroll baru
router.get('/enrolls/:id', getEnroll);    // GET enroll berdasarkan ID
router.put('/enrolls/:id', editEnroll);   // PUT untuk update enroll
router.delete('/enrolls/:id', removeEnroll); // DELETE enroll

module.exports = router;

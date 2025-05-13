const express = require('express');
const {
  getEnrolls,
  getStudEnrolls,
  getStudyEnrolls,
  addEnroll,
  getEnroll,
  editEnroll,
  removeEnroll,
  updateProgress,
  paymentRequest,
} = require('../controllers/enrollController');

const router = express.Router();

router.get('/enrolls', getEnrolls);
router.get('/studentsEnrolls/:UserID', getStudEnrolls);        // GET semua enroll for Admin
router.get('/studentEnrolls/:UserID', getStudyEnrolls);        // GET semua enroll for Students
router.post('/payments', paymentRequest); // GET semua enroll for Students
router.post('/enrolls', addEnroll);       // POST enroll baru
router.get('/enrolls/:id', getEnroll);    // GET enroll berdasarkan ID
router.put('/enrolls/:id', editEnroll);   // PUT untuk update enroll
router.delete('/enrolls/:id', removeEnroll); // DELETE enroll
router.put('/updateProgress/:UserID', updateProgress); // DELETE enroll

module.exports = router;

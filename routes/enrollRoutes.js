const express = require('express');
const {
  getEnrolls,
  getStudEnrolls,
  getEnrollByEnrollID,
  getStudyEnrolls,
  addEnroll,
  getEnroll,
  editEnroll,
  removeEnroll,
  updateProgress,
  paymentRequest,
  searchCourse,
  postCertif,
  getPayments,
  getPaymentsByUserId,
  updateUserType
} = require('../controllers/enrollController');

const router = express.Router();

router.get('/enrolls', getEnrolls);
router.get('/studentsEnrolls/:UserID', getStudEnrolls);        // GET semua enroll for Admin
router.get('/StudentsEnrollment/:EnrollID', getEnrollByEnrollID);        // GET enrollment by EnrollID buat page course
router.get('/studentEnrolls/:UserID', getStudyEnrolls);    // GET semua enroll for Students
router.get('/searchCourse/:UserID/:courseName', searchCourse);    // GET semua enroll for Students
router.post('/payments', paymentRequest); // POST pembayaran
router.get('/payments', getPayments) // Get Payment for All
router.get('/payments/:UserID', getPaymentsByUserId) // Get Payment for All
router.post('/createEnrolls', addEnroll);       // POST enroll baru
router.get('/enrolls/:id', getEnroll);    // GET enroll berdasarkan ID
router.put('/updateUser/:UserID', updateUserType);    // GET enroll berdasarkan ID
router.put('/enrolls/:id', editEnroll);   // PUT untuk update enroll
router.delete('/enrolls/:id', removeEnroll); // DELETE enroll
router.put('/updateProgress/:UserID', updateProgress); // DELETE enroll
router.post('/postCertif', postCertif);
module.exports = router;

const express = require('express');
const {
  getContactUs,
  addContactUs,
  getContactUsByIdController,
  editContactUs,
  removeContactUs,
} = require('../controllers/contactUsController');

const router = express.Router();

router.get('/contact_us', getContactUs); // GET semua contact_us
router.post('/contact_us', addContactUs); // POST contact_us baru
router.get('/contact_us/:id', getContactUsByIdController); // GET contact_us berdasarkan ID
router.put('/contact_us/:id', editContactUs); // PUT untuk update contact_us
router.delete('/contact_us/:id', removeContactUs); // DELETE contact_us

module.exports = router;

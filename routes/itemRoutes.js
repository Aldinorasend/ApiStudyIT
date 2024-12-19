const express = require('express');
const {
  getItems,
  addItem,
  getItem,
  editItem,
  removeItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/items', getItems);        // GET semua item
router.post('/items', addItem);       // POST item baru
router.get('/items/:id', getItem);    // GET item berdasarkan ID
router.put('/items/:id', editItem);   // PUT untuk update item
router.delete('/items/:id', removeItem); // DELETE item

module.exports = router;

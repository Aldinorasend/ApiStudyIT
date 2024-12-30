const express = require('express');
const {
  getTasks,
  addTask,
  getTask,
  editTask,
  removeTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/task', getTasks);        // GET semua item
router.post('/task', addTask);       // POST item baru
router.get('/task/:id', getTask);    // GET item berdasarkan ID
router.put('/task/:id', editTask);   // PUT untuk update item
router.delete('/task/:id', removeTask); // DELETE item

module.exports = router;

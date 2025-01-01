const express = require('express');
const {
  getTasks,
  addTask,
  getTask,
  editTask,
  removeTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', getTasks);        // GET semua item
router.post('/tasks', addTask);       // POST item baru
router.get('/tasks/:id', getTask);    // GET item berdasarkan ID
router.put('/tasks/:id', editTask);   // PUT untuk update item
router.delete('/tasks/:id', removeTask); // DELETE item

module.exports = router;

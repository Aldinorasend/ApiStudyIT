const express = require('express');
const {
  getTasks,
  addTask,
  getTask,
  editTask,
  removeTask,
  getTaskByIdUser,
  taskChecker,

} = require('../controllers/taskController');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', getTasks);        // GET semua item
router.post('/tasks', addTask); // POST item baru
router.get('/tasksUser/:UserID/:CourseID', getTaskByIdUser);       // GET semua task berdasarkan UserID dan CourseID
router.put('/tasks/:id/approve', taskController.approveTaskAndUpdateProgress); // PUT untuk approve task
router.get('/tasksCheck/:EnrollID/:ModulID', taskChecker); // GET semua task berdasarkan EnrollID
router.get('/tasks/:id', getTask);    // GET item berdasarkan ID
router.put('/tasks/:id', editTask);   // PUT untuk update item
router.delete('/tasks/:id', removeTask); // DELETE item

module.exports = router;

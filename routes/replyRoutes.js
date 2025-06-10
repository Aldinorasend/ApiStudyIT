const express = require('express');
const {
  getReplys,
  addReply,
  getReply,
  editReply,
  removeReply,
  getReplysByCourseID
} = require('../controllers/replyController');

const router = express.Router();

router.get('/discussion_replies', getReplys);        // GET semua reply
router.post('/discussion_replies', addReply);       // POST reply baru
router.get('/discussion_replies/:id', getReply);  
router.get('/discussion_repliesByCourseID/:CourseID', getReplysByCourseID);  // GET reply berdasarkan ID
router.put('/discussion_replies/:id', editReply);   // PUT untuk update reply
router.delete('/discussion_replies/:id', removeReply); // DELETE reply

module.exports = router;

const express = require('express');
const {
  getDiscussions,
  addDiscussion,
  getDiscussion,
  editDiscussion,
  removeDiscussion,
  getDiscussionsByCourseID
} = require('../controllers/discussionController');

const router = express.Router();

router.get('/discussions', getDiscussions);        // GET semua discussion
router.post('/discussions', addDiscussion);       // POST discussion baru
router.get('/discussions/:id', getDiscussion);  
router.get('/discussionsByCourseID/:CourseID', getDiscussionsByCourseID);  // GET discussion berdasarkan ID
router.put('/discussions/:id', editDiscussion);   // PUT untuk update discussion
router.delete('/discussions/:id', removeDiscussion); // DELETE discussion

module.exports = router;

const {
  getAllDiscussions,
  createDiscussion,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionByIdCourse
} = require('../models/discussionModel');

// Mendapatkan semua discussion
const getDiscussions = async (req, res) => {
  try {
    const discussions = await getAllDiscussions(); // Menggunakan async/await
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching discussions', details: err.message });
  }
};

const getDiscussionsByCourseID = async (req, res) => {
  const CourseID = req.params.CourseID;
  try {
    const discussions = await getDiscussionByIdCourse(CourseID); // Menggunakan async/await
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching discussions by Course ID', details: err.message });
  }
};

// Menambahkan discussion baru
const addDiscussion = async (req, res) => {
  const data = req.body;
  try {
    const result = await createDiscussion(data);
    res.json({ message: 'Discussion created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating discussion', details: err.message });
  }
};

// Mendapatkan discussion berdasarkan ID
const getDiscussion = async (req, res) => {
  const id = req.params.id;
  try {
    const discussion = await getDiscussionById(id);
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching discussion', details: err.message });
  }
};

// Mengupdate discussion
const editDiscussion = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateDiscussion(id, data);
    res.json({ message: 'Discussion updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating discussion', details: err.message });
  }
};

// Menghapus discussion
const removeDiscussion = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteDiscussion(id);
    res.json({ message: 'Discussion deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting discussion', details: err.message });
  }
};

module.exports = { getDiscussions, addDiscussion, getDiscussion, editDiscussion, removeDiscussion, getDiscussionsByCourseID };

const {
    getAllReplys,
    createReply,
    getReplyById,
    updateReply,
    deleteReply,
    getReplyByIdCourse
  } = require('../models/replyModel');
  
  // Mendapatkan semua reply
  const getReplys = async (req, res) => {
    try {
      const reply = await getAllReplys(); // Menggunakan async/await
      res.json(reply);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching reply', details: err.message });
    }
  };

  const getReplysByCourseID = async (req, res) => {
    const CourseID = req.params.CourseID;
    try {
      const reply = await getReplyByIdCourse(CourseID); // Menggunakan async/await
      res.json(reply);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching reply by Course ID', details: err.message });
    }
  };
  
  // Menambahkan reply baru
  const addReply = async (req, res) => {
    const data = req.body;
    try {
      const result = await createReply(data);
      res.json({ message: 'Reply created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating reply', details: err.message });
    }
  };
  
  // Mendapatkan reply berdasarkan ID
  const getReply = async (req, res) => {
    const id = req.params.id;
    try {
      const reply = await getReplyById(id);
      if (!reply) return res.status(404).json({ error: 'Reply not found' });
      res.json(reply);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching reply', details: err.message });
    }
  };
  
  // Mengupdate reply
  const editReply = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await updateReply(id, data);
      res.json({ message: 'Reply updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating reply', details: err.message });
    }
  };
  
  // Menghapus reply
  const removeReply = async (req, res) => {
    const id = req.params.id;
    try {
      await deleteReply(id);
      res.json({ message: 'Reply deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting reply', details: err.message });
    }
  };
  
  module.exports = { getReplys, addReply, getReply, editReply, removeReply, getReplysByCourseID };
  
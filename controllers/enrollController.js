const {
    getAllEnrolls,
    createEnroll,
    getEnrollById,
    updateEnroll,
    deleteEnroll,
  } = require('../models/enrollModel');
  
  // Mendapatkan semua enroll
  const getEnrolls = async (req, res) => {
    try {
      const enrolls = await getAllEnrolls(); // Menggunakan async/await
      res.json(enrolls);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching enrolls', details: err.message });
    }
  };
  
  // Menambahkan enroll baru
  const addEnroll = async (req, res) => {
    const data = req.body;
    try {
      const result = await createEnroll(data);
      res.json({ message: 'Enroll created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating enroll', details: err.message });
    }
  };
  
  // Mendapatkan enroll berdasarkan ID
  const getEnroll = async (req, res) => {
    const id = req.params.id;
    try {
      const enroll = await getEnrollById(id);
      if (!enroll) return res.status(404).json({ error: 'Enroll not found' });
      res.json(enroll);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching enroll', details: err.message });
    }
  };
  
  // Mengupdate enroll
  const editEnroll = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await updateEnroll(id, data);
      res.json({ message: 'Enroll updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating enroll', details: err.message });
    }
  };
  
  // Menghapus enroll
  const removeEnroll = async (req, res) => {
    const id = req.params.id;
    try {
      await deleteEnroll(id);
      res.json({ message: 'Enroll deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting enroll', details: err.message });
    }
  };
  
  module.exports = { getEnrolls, addEnroll, getEnroll, editEnroll, removeEnroll };
  
const {
    getAllEnrolls,
    createEnroll,
    getEnrollById,
    updateEnroll,
    deleteEnroll,
    getStudentsEnrolls,
    getStudentsEnrollsForUser,
    UpdatedProgress,
  } = require('../models/enrollModel');
  
  // Mendapatkan semua enroll
  const getStudEnrolls = async (req, res) => {
    const UserID = req.params.UserID;
    console.log('Checking enrollments for user_id:', UserID);
    try {
      const enrolls = await getStudentsEnrolls(UserID); // Menggunakan async/await
      if (enrolls.length === 0) {
        return res.status(404).json({ error: 'Enrollments not found for this user' });
      }      
      res.json(enrolls);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching enrolls', details: err.message });
    }
  };

  const getStudyEnrolls = async (req, res) => {
    const UserID = req.params.UserID;
    console.log('Checking enrollments for user_id in Student Page:', UserID);
    try {
      const enrolls = await getStudentsEnrollsForUser(UserID); // Menggunakan async/await
      if (enrolls.length === 0) {
        return res.status(404).json({ error: 'Enrollments not found for this user' });
      }      
      res.json(enrolls);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching enrolls', details: err.message });
    }
  };
  
  

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

  const updateProgress = async (req, res) => {
    const UserID = req.params.UserID;
    try {
      await UpdatedProgress(UserID);
      res.json({ message: 'Enroll updated' });
      console.log('Progress updated for user:', UserID);
    } catch (err) {
      res.status(500).json({ error: 'Error updating enroll', details: err.message });
      console.log('Error updating progress for user:', UserID, err.message);
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
  
  module.exports = { getEnrolls, addEnroll, getEnroll, editEnroll, getStudEnrolls, getStudyEnrolls,removeEnroll, updateProgress };
  
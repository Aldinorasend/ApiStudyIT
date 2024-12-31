const {
    getAllModuls,
    createModul,
    getModulById,
    updateModul,
    deleteModul,
    getModulByIdCourse
  } = require('../models/modulModel');
  
  // Mendapatkan semua modul
  const getModuls = async (req, res) => {
    try {
      const moduls = await getAllModuls(); // Menggunakan async/await
      res.json(moduls);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching moduls', details: err.message });
    }
  };

  const getModulsByCourseID = async (req, res) => {
    const CourseID = req.params.CourseID;
    try {
      const moduls = await getModulByIdCourse(CourseID); // Menggunakan async/await
      res.json(moduls);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching moduls by Course ID', details: err.message });
    }
  };
  
  // Menambahkan modul baru
  const addModul = async (req, res) => {
    const data = req.body;
    try {
      const result = await createModul(data);
      res.json({ message: 'Modul created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating modul', details: err.message });
    }
  };
  
  // Mendapatkan modul berdasarkan ID
  const getModul = async (req, res) => {
    const id = req.params.id;
    try {
      const modul = await getModulById(id);
      if (!modul) return res.status(404).json({ error: 'Modul not found' });
      res.json(modul);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching modul', details: err.message });
    }
  };
  
  // Mengupdate modul
  const editModul = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await updateModul(id, data);
      res.json({ message: 'Modul updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating modul', details: err.message });
    }
  };
  
  // Menghapus modul
  const removeModul = async (req, res) => {
    const id = req.params.id;
    try {
      await deleteModul(id);
      res.json({ message: 'Modul deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting modul', details: err.message });
    }
  };
  
  module.exports = { getModuls, addModul, getModul, editModul, removeModul, getModulsByCourseID };
  
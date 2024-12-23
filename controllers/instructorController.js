const {
  getAllInstructors,
  createInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require('../models/instructorModel');

// Mendapatkan semua instructor
const getInstructors = async (req, res) => {
  try {
    const instructors = await getAllInstructors(); // Menggunakan async/await
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching instructors', details: err.message });
  }
};

// Menambahkan instructor baru
const addInstructor = async (req, res) => {
  const data = req.body;
  try {
    const result = await createInstructor(data);
    res.json({ message: 'Instructor created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating instructor', details: err.message });
  }
};

// Mendapatkan instructor berdasarkan ID
const getInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    const instructor = await getInstructorById(id);
    if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching instructor', details: err.message });
  }
};

// Mengupdate instructor
const editInstructor = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateInstructor(id, data);
    res.json({ message: 'Instructor updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating instructor', details: err.message });
  }
};

// Menghapus instructor
const removeInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteInstructor(id);
    res.json({ message: 'Instructor deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting instructor', details: err.message });
  }
};

module.exports = { getInstructors, addInstructor, getInstructor, editInstructor, removeInstructor };

const {
  getAllInstructors,
  getTotalInstructors,
  createInstructor,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require('../models/instructorModel');

const getPaginatedInstructors = async (req, res) => {
  const { _page = 1, _limit = 10 } = req.query; // Ambil query params
  const offset = (_page - 1) * _limit; // Hitung offset
  const limit = parseInt(_limit, 10);

  try {
      const { count, rows } = await Instructor.findAndCountAll({
          offset,
          limit,
      });

      const totalPages = Math.ceil(count / limit); // Menghitung total halaman

      res.json({
          data: rows,
          meta: {
              total: count,
              page: _page,
              totalPages: totalPages,
              limit: _limit
          }
      });
  } catch (err) {
      res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
};

// Mendapatkan semua instructor
const getInstructors = async (req, res) => {
  // Extract pagination parameters from the query string
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 items per page
  const offset = (page - 1) * limit; // Calculate the offset for SQL query

  try {
    // Fetch paginated data
    const instructors = await getAllInstructors(limit, offset);

    // Get the total number of instructors for meta information
    const totalInstructors = await getTotalInstructors(); // Function to count total records
    const totalPages = Math.ceil(totalInstructors / limit);

    // Respond with data and pagination meta
    res.status(200).json({
      data: instructors,
      meta: {
        total: totalInstructors,
        page,
        totalPages,
        limit,
      },
    });
  } catch (err) {
    // Handle errors gracefully
    res.status(500).json({
      error: 'Error fetching instructors',
      details: err.message,
    });
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

module.exports = { getInstructors, getPaginatedInstructors,addInstructor, getInstructor, editInstructor, removeInstructor };

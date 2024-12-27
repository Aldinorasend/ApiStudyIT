const {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
  } = require('../models/courseModel');
  
  // Mendapatkan semua course
  const getCourses = async (req, res) => {
    try {
      const courses = await getAllCourses(); // Menggunakan async/await
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching courses', details: err.message });
    }
  };
  
  // Menambahkan course baru
  const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Validasi file berdasarkan tipe MIME
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
    // file.mimetype === 'application/pdf'
  ) {
    cb(null, true); // Terima file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'), false);
  }
};

// Konfigurasi Multer untuk menyimpan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Path ke folder 'uploads'
    const uploadPath = path.join(__dirname, '../uploads');

    // Membuat folder jika belum ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Gunakan nama file asli
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, fileFilter }).single('image'); // 'image' adalah field input file di form

// Fungsi untuk menambahkan course
const addCourse = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Simpan relative path untuk file
    const imagePath = `${req.file.filename}`;

    // Data course
    const data = {
      course_name: req.body.course_name,
      description: req.body.description,
      level: req.body.level,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      status: req.body.status,
      instructor_id: req.body.instructor_id,
      image: imagePath, // Simpan path file di database
    };

    try {
      const result = await createCourse(data); // Fungsi untuk menyimpan data ke database
      res.json({ message: 'Course created successfully', id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating course', details: err.message });
    }
  });
};



// Fungsi untuk transfer file ke server Laravel

  // Mendapatkan course berdasarkan ID
  const getCourse = async (req, res) => {
    const id = req.params.id;
    try {
      const course = await getCourseById(id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching course', details: err.message });
    }
  };
  
  // Mengupdate course
  const editCourse = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await updateCourse(id, data);
      res.json({ message: 'Course updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating course', details: err.message });
    }
  };
  
  // Menghapus course
  const removeCourse = async (req, res) => {
    const id = req.params.id;
    try {
      await deleteCourse(id);
      res.json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting course', details: err.message });
    }
  };
  
  module.exports = { getCourses, addCourse, getCourse, editCourse, removeCourse };
  
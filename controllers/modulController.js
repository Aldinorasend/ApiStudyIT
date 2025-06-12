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
  
  const upload = multer({ storage, fileFilter }).single('Assetto'); // 'image' adalah field input file di form
  // Menambahkan modul baru
  const addModul = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'File upload error', details: err.message });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const imagePath = `${req.file.filename}`;
      const data = {
        CourseID: req.body.CourseID,
        Title: req.body.Title,
        Description: req.body.Description,
        YTEmbedLink: req.body.YTEmbedLink,
        Task: req.body.Task,
        Assetto: imagePath, // Simpan path file di database
      };
    try {
      const result = await createModul(data);
      console.log(data);
      res.json({ message: 'Modul created', id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating modul', details: err.message });
    }
  })};
  
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
    const id = req.params.id;
    const data = {
      CourseID: req.body.CourseID,
      Title: req.body.Title,
      Description: req.body.Description,
      YTEmbedLink: req.body.YTEmbedLink,
      Task: req.body.Task,
      Assetto: imagePath, // Simpan path file di database
    };
    try {
      console.log(data);
      await updateModul(id, data);
      res.json({ message: 'Modul updated' });
    } catch (err) {
      res.status(500).json({ error: 'Error updating modul', details: err.message });
    }
  });
}
  
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
  
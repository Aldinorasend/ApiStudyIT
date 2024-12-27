const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan folder tempat menyimpan file
    cb(null, 'public/uploads/courses'); // Folder 'courses' di dalam 'uploads'
  },
  filename: function (req, file, cb) {
    // Mengubah nama file agar tidak bentrok
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp di nama file
  }
});

// Filter untuk memastikan hanya file gambar yang diterima
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only image files are allowed!');
  }
};

// Inisialisasi multer dengan konfigurasi
const upload = multer({ storage, fileFilter });

module.exports = upload;

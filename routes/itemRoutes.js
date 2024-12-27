const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Folder untuk menyimpan file sementara
const express = require('express');
const {
  getItems,
  addItem,
  getItem,
  editItem,
  removeItem,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/items', getItems);        // GET semua item
router.post('/items', addItem);       // POST item baru
router.get('/items/:id', getItem);    // GET item berdasarkan ID
router.put('/items/:id', editItem);   // PUT untuk update item
router.delete('/items/:id', removeItem); // DELETE item

// Endpoint untuk menerima file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
});

module.exports = router;

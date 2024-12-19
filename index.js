const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Gunakan CORS
app.use(cors()); // Ini akan mengizinkan semua domain untuk mengakses API

// Middleware untuk body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gunakan routes untuk API
app.use('/api', itemRoutes); // Semua API diawali dengan /api

// Jalankan server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

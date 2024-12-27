const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const itemRoutes = require('./routes/itemRoutes');
const accountRoutes = require('./routes/accountRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const modulRoutes = require('./routes/modulRoutes');

require('dotenv').config();

const courseRoutes = require('./routes/courseRoutes');


const app = express();

// Gunakan CORS
app.use(cors()); // Ini akan mengizinkan semua domain untuk mengakses API

// Middleware untuk body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Gunakan routes untuk API
app.use('/api', itemRoutes); // Semua API diawali dengan /api
app.use('/api', accountRoutes);
app.use('/api', instructorRoutes)

app.use('/api', modulRoutes);

app.use('/api', courseRoutes)


// Jalankan server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
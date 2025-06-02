const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const itemRoutes = require('./routes/itemRoutes');
const accountRoutes = require('./routes/accountRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const modulRoutes = require('./routes/modulRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes'); // Import task routes
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const replyRoutes = require('./routes/replyRoutes'); // Import reply routes
const discussionRoutes = require('./routes/discussionRoutes'); // Import discussion routes

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
app.use('/api', enrollRoutes);

app.use('/api', courseRoutes);
app.use('/api', contactUsRoutes); // Gunakan taskRoutes

app.use('/api', taskRoutes);

app.use('/api', replyRoutes);

app.use('/api', discussionRoutes);


// Jalankan server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
const mysql = require('mysql2/promise');

// Konfigurasi koneksi database menggunakan pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',

<<<<<<< HEAD
  database: 'studyitv3',

  // database: 'studyitfinal',
=======
//   database: 'studyitv3',

  database: 'studyitfinal',
>>>>>>> db05422bfee0025d7c6c784ecc1a8c08cd43578b

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Fungsi untuk memeriksa koneksi
(async () => {
  try {
    const connection = await pool.getConnection(); // Ambil koneksi dari pool
    console.log('Connected to the database.');
    connection.release(); // Kembalikan koneksi ke pool
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  }
})();

// Ekspor pool untuk digunakan di file lain
module.exports = pool;

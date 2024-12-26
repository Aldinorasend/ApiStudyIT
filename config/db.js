const mysql = require('mysql2/promise');

// Konfigurasi koneksi database menggunakan pool
const pool = mysql.createPool({
  host: '153.92.15.44',
  user: 'u229098060_studyittubes',
  password: 'TubesSmt5',
  database: 'u229098060_studyitfinal',
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

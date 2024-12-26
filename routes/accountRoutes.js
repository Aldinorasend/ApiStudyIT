const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');

// Route untuk membuat akun baru
router.post('/register', AccountController.createAccount);

// Route untuk mendapatkan akun berdasarkan email atau username
router.get('/login', AccountController.getAccount);

module.exports = router;

const bcrypt = require('bcrypt');
const Account = require('../models/accountModel');

const AccountController = {
  addAccount: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into database
      Account.create(email, hashedPassword, (err, results) => {
        if (err) {
          console.error('Error creating account:', err.message);
          return res.status(500).json({ message: 'Failed to create account.' });
        }

        res.status(201).json({
          message: 'Account created successfully.',
          accountId: results.insertId,
        });
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Server error.' });
    }
  },
};

module.exports = AccountController;

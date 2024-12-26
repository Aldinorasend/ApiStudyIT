const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Account = require('../models/accountModel');

const AccountController = {
  addAccount: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

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

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Find account by email
      Account.findByEmail(email, async (err, account) => {
        if (err) {
          console.error('Error finding account:', err.message);
          return res.status(500).json({ message: 'Server error.' });
        }

        if (!account) {
          return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT
        const token = jwt.sign(
          { id: account.id, email: account.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.json({
          message: 'Login successful.',
          token,
        });
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Server error.' });
    }
  },
};

module.exports = AccountController;

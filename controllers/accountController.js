const bcrypt = require('bcrypt');
const { createAccount, getAccountByEmailorUsername } = require('../models/accountModel');
const jwt = require('jsonwebtoken');

const AccountController = {
  createAccount: async (req, res) => {
    const { username, firstname, lastname, phonenumber, email, password } = req.body;

    if (!username || !firstname || !lastname || !phonenumber || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const data = {
        username,
        firstname,
        lastname,
        phonenumber,
        email,
        password: hashedPassword,
        regist_date: new Date(),
      };

      const result = await createAccount(data);

      res.status(201).json({
        message: 'Account created successfully.',
        accountId: result.insertId,
      });
    } catch (err) {
      console.error('Error creating account:', err.message);
      if (err.message === 'Email or username already in use.') {
        return res.status(409).json({ message: err.message });
      }
      res.status(500).json({ message: 'Server error.' });
    }
  },

  getAccount: async (req, res) => {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const account = await getAccountByEmailorUsername(email);

      if (!account) {
        return res.status(404).json({ message: 'Invalid email or password.' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      // Generate JWT
      const tokenPayload = {
        id: account.id,
        username: account.username,
        email: account.email,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: rememberMe ? '7d' : '1h',
      });

      // Update remember_token if rememberMe is true
      if (rememberMe) {
        account.remember_token = token;
        // Add logic to update remember_token in the database if needed
      }

      res.json({
        message: 'Login successful.',
        token,
      });
    } catch (err) {
      console.error('Error logging in:', err.message);
      res.status(500).json({ message: 'Server error.' });
    }
  },
};

module.exports = AccountController;

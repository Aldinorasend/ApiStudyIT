const bcrypt = require('bcrypt');

const {
  getAllAccounts, createAccount, getAccountByEmailorUsername, updateAccount, deleteAccount
} = require('../models/accountModel');

const getAccounts = async (req, res) => {
  try {
    const items = await getAllAccounts(); // Menggunakan async/await
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Accounts', details: err.message });
  }
};

const addAccount = async (req, res) => {
  const data = req.body;
  try {
    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(data.password, 10);  // 10 adalah salt rounds
    data.password = hashedPassword;

    data.regist_date = new Date();

    const result = await createAccount(data);
    res.json({ message: 'Account Created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error creating Account', details: err.message });
  }
};

const getAccount = async (req, res) => {
  const { email, username, password } = req.body; // Ambil dari query params untuk fleksibilitas
  if (!email && !username) {
    return res.status(400).json({ error: 'Email or username must be provided' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password must be provided' });
  }

  try {
    const account = await getAccountByEmailorUsername(email, username);
    console.log('Account fetched',account);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email/username or password' });
    }
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching Account', details: err.message });
  }
};


const editAccount = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await updateAccount(id, data);
    res.json({ message: 'Account updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating Account', details: err.message });
  }
};

const removeAccount = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteAccount(id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting Account', details: err.message });
  }
};

module.exports = {
  getAccounts, addAccount, getAccount, editAccount, removeAccount
}
// const db = require('../config/db');
// const bcrypt = require('bcrypt');
// const { createAccount, getAccountByEmailorUsername } = require('../models/accountModel');
// const jwt = require('jsonwebtoken');

// const AccountController = {
//   createAccount: async (req, res) => {
//     const { username, firstname, lastname, phonenumber, email, password } = req.body;

//     if (!username || !firstname || !lastname || !phonenumber || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     try {
//       // Hash the password before storing it
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const data = {
//         username,
//         firstname,
//         lastname,
//         phonenumber,
//         email,
//         password: hashedPassword,
//         regist_date: new Date(),
//       };

//       const result = await createAccount(data);

//       res.status(201).json({
//         message: 'Account created successfully.',
//         accountId: result.insertId,
//       });
//     } catch (err) {
//       console.error('Error creating account:', err.message);
//       if (err.message === 'Email or username already in use.') {
//         return res.status(409).json({ message: err.message });
//       }
//       res.status(500).json({ message: 'Server error.' });
//     }
//   },

//   getAccount: async (req, res) => {
//     const { email, password, rememberMe } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     try {
//       const account = await getAccountByEmailorUsername(email);

//       if (!account) {
//         return res.status(404).json({ message: 'Invalid email or password.' });
//       }

//       // Verify password
//       const isPasswordValid = await bcrypt.compare(password, account.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid email or password.' });
//       }

//       // Generate JWT
//       const tokenPayload = {
//         id: account.id,
//         username: account.username,
//         email: account.email,
//       };

//       const JWT_SECRET = process.env.JWT_SECRET;

//       if (!JWT_SECRET) {
//         throw new Error('JWT_SECRET is not set in environment variables');
//       }

//       const token = jwt.sign(tokenPayload, JWT_SECRET, {
//         expiresIn: rememberMe ? '7d' : '1h',
//       });

//       // Update remember_token if rememberMe is true
//       if (rememberMe) {
//         account.remember_token = token;
//         const updateSql = 'UPDATE accounts SET remember_token = ? WHERE id = ?';
//         await db.query(updateSql, [token, account.id]);
//       }


//       res.json({
//         message: 'Login successful.',
//         token,
//       });
//     } catch (err) {
//       console.error('Error logging in:', err.message);
//       res.status(500).json({ message: 'Server error.' });
//     }
//   },
// };

// module.exports = AccountController;

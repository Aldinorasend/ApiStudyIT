const express = require('express');
const {
    getAccounts, 
    addAccount, 
    getAccount, 
    editAccount,
    removeAccount
} = require('../controllers/accountController');

const router = express.Router();

router.get('/Accounts', getAccounts);
router.post('/Accounts', addAccount);
router.post('/Accounts/search', getAccount);
router.put('/Accounts/:id', editAccount);
router.delete('/Accounts/:id', removeAccount);

module.exports = router;

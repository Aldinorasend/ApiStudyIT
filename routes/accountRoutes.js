const express = require('express');
const {
    getAccounts, 
    addAccount, 
    getAccount, 
    editAccount,
    removeAccount,
    requestResetPassword,
    resetPassword
} = require('../controllers/accountController');

const router = express.Router();

router.get('/Accounts', getAccounts);
router.post('/Accounts', addAccount);
router.post('/Accounts/search', getAccount);
router.put('/Accounts/:id', editAccount);
router.delete('/Accounts/:id', removeAccount);
router.post('/Accounts/request-reset', requestResetPassword);
router.post('/Accounts/reset-password/:token', resetPassword);

module.exports = router;

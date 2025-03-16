const express = require('express');
const {
    getAccounts,
    addAccount,
    getAccount,
    editAccount,
    removeAccount,
    requestResetPassword,
    resetPassword,
    getOneAccounts,
    enable2FA,
    verify2FA,
    loginWith2FA,
    disable2FA
} = require('../controllers/accountController');

const router = express.Router();

router.get('/Accounts', getAccounts);
router.get('/Accounts/:id', getOneAccounts);

router.post('/Accounts', addAccount);
router.post('/Accounts/search', getAccount);
router.put('/Accounts/:id', editAccount);
router.delete('/Accounts/:id', removeAccount);
router.post('/Accounts/request-reset', requestResetPassword);
router.post('/Accounts/reset-password/:token', resetPassword);
router.post('/Accounts/enable-2fa', enable2FA);
router.post('/Accounts/verify-2fa', verify2FA);
router.post('/Accounts/login-2fa', loginWith2FA);
router.post('/Accounts/disable-2fa', disable2FA);

module.exports = router;

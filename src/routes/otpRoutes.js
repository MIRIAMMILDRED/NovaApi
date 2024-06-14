const express = require('express');
const router = express.Router();
const { signUp, verifyOTP } = require('../controllers/otpController');

router.post('/send', signUp);
router.post('/verify', verifyOTP);

module.exports = router;

// userRoutes.js
const express = require('express');
const router = express.Router();
const { signUp, verifyOTP } = require('../controllers/userController');

router.post('/signup', signUp);
router.post('/verify', verifyOTP);

module.exports = router;

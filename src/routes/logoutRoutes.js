// routes/logoutRoutes.js
const express = require('express');
const router = express.Router();

// POST /logout route
router.post('/', (req, res) => {
  // Assuming session is handled with a cookie
  res.clearCookie('session_id'); // Adjust based on your session cookie name
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;

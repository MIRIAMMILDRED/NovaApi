const User = require('../models/userModel');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Function to register a new user
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role, companyId } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Create new user
  user = new User({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 10), // Hash password
    role,
    companyId
  });

  // Generate OTP
  const otp = crypto.randomBytes(2).toString('hex');
  user.verificationCode = otp;

  try {
    await user.save();
    await sendEmail(email, `Your OTP code is ${otp}`);
    res.status(201).json({ success: true, message: 'User registered. OTP sent to email' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

// Function to verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, verificationCode: otp });

    if (user) {
      user.isVerified = true;
      user.verificationCode = undefined;
      await user.save();
      res.status(200).json({ success: true, message: 'OTP verified. User is now verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

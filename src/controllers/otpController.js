const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const signUp = async (req, res) => {
  const { fullname, email, industry, company, companysize, password, role } = req.body;

  try {
    // Validate that all required fields are present
    if (!fullname || !email || !industry || !company || !companysize || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOTP();

    user = new User({
      fullname,
      email,
      industry,
      company,
      companysize,
      password,
      role,
      otp
     
    });

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your NOVA account',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <p>Hey there,</p>
          <p>Thanks for joining the NOVA revolution! This code is your key to unlocking a world of seamless
          customer service ticketing.</p>
          <p style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; padding: 10px 20px; font-size: 24px; color: white; background-color: blue; border-radius: 5px;">
              Verification Code: ${otp}
            </span>
          </p>
          <p>Get ready to streamline your support process and impress your clients.</p>
          <p>See you on the other side!</p>
          <p>Team NOVA</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending OTP email' });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'OTP sent successfully' });
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


    
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.otp = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signUp,
  verifyOTP,
};

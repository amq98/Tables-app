const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register a new user
const registerUser = async (req, res) => {
  const { email, password, confirmPassword, mobileNumber, agreeToTerms } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      mobileNumber,
      agreeToTerms,
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Google login
const googleLogin = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, email_verified } = ticket.getPayload();

    if (email_verified) {
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({ email, password: '', mobileNumber: '', agreeToTerms: true });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, user });
    } else {
      return res.status(400).json({ message: 'Google login failed' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Facebook login
const facebookLogin = async (req, res) => {
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { email } = data;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ email, password: '', mobileNumber: '', agreeToTerms: true });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  facebookLogin,
};

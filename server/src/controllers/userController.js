const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password');
    }
    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).send('Error fetching user profile');
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const { name, email, password } = req.body;
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).send('Error updating user profile');
  }
});

module.exports = router;

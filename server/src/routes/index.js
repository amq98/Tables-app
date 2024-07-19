// server/src/routes/index.js
const express = require('express');
const userController = require('../controllers/userController');
const restaurantController = require('../controllers/restaurantController');
const reservationController = require('../controllers/reservationController');
const authRoutes = require('./authRoutes');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userController);
router.use('/restaurants', restaurantController);
router.use('/reservations', authenticateToken, reservationController);

module.exports = router;

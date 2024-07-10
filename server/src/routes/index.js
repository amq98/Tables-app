const express = require('express');
const userController = require('../controllers/userController');
const restaurantController = require('../controllers/restaurantController');
const reservationController = require('../controllers/reservationController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/users', userController);
router.use('/restaurants', authenticateToken, restaurantController);
router.use('/reservations', authenticateToken, reservationController);

module.exports = router;

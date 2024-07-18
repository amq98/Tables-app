// server/src/routes/index.js

const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurant);
router.post('/restaurants', restaurantController.createRestaurant);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

module.exports = router;

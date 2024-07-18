// server/src/controllers/restaurantController.js

const Restaurant = require('../models/Restaurant');

const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Restaurant.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedRestaurant = await Restaurant.findOne({ where: { id } });
      return res.status(200).json(updatedRestaurant);
    }
    throw new Error('Restaurant not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching restaurant with ID:', id); // Add this log
    const restaurant = await Restaurant.findOne({ where: { id } });
    if (restaurant) {
      console.log('Found restaurant:', restaurant); // Add this log
      return res.status(200).json({ restaurant });
    }
    console.log('Restaurant not found with ID:', id); // Add this log
    return res.status(404).send('Restaurant not found');
  } catch (error) {
    console.error('Error fetching restaurant:', error); // Add this log
    return res.status(500).send(error.message);
  }
};




const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    return res.status(201).json(restaurant);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Restaurant.destroy({
      where: { id }
    });
    if (deleted) {
      return res.status(204).send('Restaurant deleted');
    }
    throw new Error('Restaurant not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

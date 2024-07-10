const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).send('Error fetching reservations');
  }
});

// Get a specific reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).send('Reservation not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching reservation');
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).send('Error creating reservation');
  }
});

// Update an existing reservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }
    await reservation.update(req.body);
    res.json(reservation);
  } catch (error) {
    res.status(400).send('Error updating reservation');
  }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }
    await reservation.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting reservation');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');

// create a new habit
router.post('/', habitController.createHabit);

// Obtain all habits
router.get('/', habitController.getAllHabits);

// obtain habits by user
router.get('/user/:userId', habitController.getHabitsByUser);

// Obtain a habit by its ID
router.get('/:id', habitController.getHabitById);

// update a habit by its ID
router.put('/:id', habitController.updateHabit);

// delete a habit by its ID
router.delete('/:id', habitController.deleteHabit);

module.exports = router;    
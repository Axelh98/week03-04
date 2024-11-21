const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');

// create a new habit
router.post('/', habitController.create);

// Obtain all habits
router.get('/', habitController.getAllHabits);

// Obtain a habit by its ID
router.get('/:id', habitController.getHabitById);

// update a habit by its ID
router.put('/:id', habitController.updateHabitById);

// delete a habit by its ID
router.delete('/:id', habitController.deleteHabitById);

module.exports = router;    
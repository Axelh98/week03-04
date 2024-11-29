const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');
const checkAuth = require('../middleware/requireLogin');

// Obtain all habits
router.get('/', habitController.getHabitsByUser);

// Show the create habit form
router.get('/create', checkAuth, habitController.showCreateHabitForm);

// create a new habit
router.post('/create', checkAuth, habitController.createHabit);

// Obtain a habit by its ID
router.get('/:id', habitController.getHabitById);

// Show the edit habit form (showEditHabitForm)
router.get('/edit/:habitId', habitController.showEditHabitForm);

// update a habit by its ID
router.post('/update/:id', habitController.updateHabit);

// delete a habit by its ID
router.post('/delete/:id', habitController.deleteHabit);

module.exports = router;    
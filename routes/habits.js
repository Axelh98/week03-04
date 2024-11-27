const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit');


// Obtain all habits
router.get('/', habitController.getAllHabits);

// create a new habit
router.post('/create', habitController.createHabit);

// obtain habits by user
router.get('/user/:userId', habitController.getHabitsByUser);

// Obtain a habit by its ID
router.get('/:id', habitController.getHabitById);

// Show the edit habit form
router.get('/edit/:id', habitController.showEditHabitForm);

// update a habit by its ID
router.post('/update/:id', habitController.updateHabit);

// delete a habit by its ID
router.delete('/delete/:id', habitController.deleteHabit);

module.exports = router;    
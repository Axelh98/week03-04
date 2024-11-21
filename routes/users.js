const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Obtain all users
router.get('/', userController.getAllUsers);

// Obtain a user by its ID
router.get('/:id', userController.getUserById);

// Create a new user
router.post('/', userController.createUser);

// update a user by its ID
router.put('/:id', userController.updateUserById);

// delete a user by its ID
router.delete('/:id', userController.deleteUserById);

module.exports = router;
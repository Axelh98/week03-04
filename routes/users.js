const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const checkAuth = require('../middleware/requireLogin');

// Obtain all users
router.get('/', userController.getAllUsers);

// Obtain a user by its ID
router.get('/:id', userController.getUserById);

// update a user by its ID
router.put('/:id', userController.updateUserById);

// delete a user by its ID
router.delete('/:id', userController.deleteUserById);


module.exports = router;
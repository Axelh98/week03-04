const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController); // ¿Es undefined? Si sí, revisa la importación.

// Obtain the login page
router.get('/login', authController.renderLogin);

// Process the login form
router.post('/login', authController.loginUser);

// Obtain the register page 
router.get('/register', authController.renderRegister);

// Process the register form
router.post('/register', authController.registerUser);

// Obtain the logout page
router.get('/logout', authController.logoutUser);


module.exports = router;

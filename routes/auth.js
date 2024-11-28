const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

console.log(authController); // ¿Es undefined? Si sí, revisa la importación.

// Obtain the login page
router.get('/login', authController.renderLogin);

// Process the login form
router.post('/login', authController.loginUser);


module.exports = router;

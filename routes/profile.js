const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/requireLogin');
const profileController = require('../controllers/profileController');

// Ruta para ver el perfil
router.get('/', checkAuth, profileController.showProfile);

module.exports = router;

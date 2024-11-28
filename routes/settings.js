const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/requireLogin');
const settingsController = require('../controllers/settings');

// Ruta para ver los ajustes
router.get('/', checkAuth, settingsController.showSettings);

// Ruta para actualizar los ajustes
router.post('/', checkAuth, settingsController.updateSettings);

module.exports = router;

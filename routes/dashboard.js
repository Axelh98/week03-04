// En routes/dashboard.js
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/requireLogin');

// Route to the dashboard, protected by authentication
router.get('/', checkAuth, (req, res) => {
  res.render('dashboard', { user: req.session.userId });
});

module.exports = router;

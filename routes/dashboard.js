// En routes/dashboard.js
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/requireLogin');

// Route to the dashboard, protected by authentication
router.get('/', checkAuth, (req, res) => {
  res.render('dashboard', { user: req.session.userId });
});

/*
// Route to the profile page
router.get('/profile', checkAuth, (req, res) => {
    res.render('profile', { title: 'Profile', user: req.session.userId });
  });
  
  // Route to the settings page
  router.get('/settings', checkAuth, (req, res) => {
    res.render('settings', { title: 'Settings', user: req.session.userId });
  });
  */
  // Route to log out
  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.redirect('/');
      res.redirect('/login');
    });
  });

module.exports = router;

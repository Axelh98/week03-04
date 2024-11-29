const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./database/connection');
const habitRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const settingsRoutes = require('./routes/settings');
const profileRoutes = require('./routes/profile');
const checkAuth = require('./middleware/requireLogin');
const setUser = require('./middleware/setUser');
const port = 8080;
const session = require('express-session');

require('dotenv').config();

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(setUser);


// Database connection
connectDB();


// Default route
app.get('/', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('auth/login');  // Si no está autenticado, redirige al login
  }
  res.render('/dashboard', { title: 'Dashboard', user: req.session.userId });  // Renderiza el dashboard
});

// Login route
app.get('auth/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('auth/login', { title: 'Login' });  
});

app.use((req, res, next) => {
  res.locals.currentPath = req.originalUrl;  
  next();
});

// Habits routes
app.use('/habits', habitRoutes);

// Users routes
app.use('/users', userRoutes);

// Auth routes
app.use('/auth', authRoutes);

// Dashboard routes
app.use('/dashboard', dashboardRoutes);

// Settings routes
app.use('/settings', settingsRoutes);

// Profile routes 
app.use('/profile', profileRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
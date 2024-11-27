const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./database/connection');
const habitRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');
const expressLayouts = require('express-ejs-layouts');
const port = 8080;

require('dotenv').config();


// engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// Default route
app.get('/', (req, res) => {
    res.render('login', { title: 'Login'});
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Aquí validas las credenciales con tu base de datos
  console.log(`Email: ${email}, Password: ${password}`);

  // Redirigir o mostrar un mensaje
  if (email === 'test@example.com' && password === '1234') {
      res.send('Login successful!');
  } else {
      res.status(401).send('Invalid credentials!');
  }
});

// Habits routes
app.use('/habits', habitRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./database/connection');
const habitRoutes = require('./routes/habits');
const userRoutes = require('./routes/users');
const port = 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// Default route
app.get('/', (req, res) => {
    res.send('Habit Tracker API is running!');
});

// Habits routes
app.use('/habits', habitRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
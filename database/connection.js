const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    const dbName = mongoose.connection.db.databaseName;
    const coleccions = mongoose.connection.collections;
    const coleccionsNames = Object.keys(coleccions).map(coleccion => coleccions[coleccion]);
    const coleccionNames = coleccionsNames.map(coleccion => coleccion.collectionName);

    console.log('Connected to database:' + dbName);
    console.log('Collections in database:' + coleccionNames);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Finaliza el proceso si falla la conexión
  }
};

module.exports = connectDB;


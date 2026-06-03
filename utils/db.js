const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Se usa await para capturar los errores
    await mongoose.connect('mongodb://127.0.0.1:27017/movies-server');
    console.log('Conexión exitosa a la base de datos MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    // Si la base de datos falla al arrancar, se detiene el servidor
    process.exit(1); 
  }
};

module.exports = connectDB;
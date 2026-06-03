const mongoose = require('mongoose');
const Movie = require('../models/Movie');

const movies = [
  { title: 'The Matrix', director: 'Hermanas Wachowski', year: 1999, genre: 'Acción' },
  { title: 'The Matrix Reloaded', director: 'Hermanas Wachowski', year: 2003, genre: 'Acción' },
  { title: 'Buscando a Nemo', director: 'Andrew Stanton', year: 2003, genre: 'Animación' },
  { title: 'Buscando a Dory', director: 'Andrew Stanton', year: 2016, genre: 'Animación' },
  { title: 'Interestelar', director: 'Christopher Nolan', year: 2014, genre: 'Ciencia ficción' },
  { title: '50 primeras citas', director: 'Peter Segal', year: 2004, genre: 'Comedia romántica' },
];

// Conexión a la base de datos local
mongoose.connect('mongodb://127.0.0.1:27017/movies-server')
  .then(async () => {
    console.log('Conectado a la base de datos. Ejecutando semilla...');
    
    // Para limpiar la colección antes de insertar para evitar duplicados
    await Movie.collection.drop().catch(() => console.log('La colección aún no existe. Creando una nueva...'));
    
    // Se inserta las películas
    await Movie.insertMany(movies);
    console.log('¡Películas insertadas con éxito!');
  })
  .catch((err) => console.error('Error en el proceso de seed:', err))
  .finally(() => {
    // Se cierra la conexión al terminar
    mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  });
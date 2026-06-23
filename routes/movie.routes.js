//Las rutas CRUD separadas
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// 1. GET - Devolver todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

// 2. GET - Devolver películas estrenadas a partir de un año específico
router.get('/year/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const movies = await Movie.find({ year: { $gte: year } });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por año' });
  }
});

// 3. GET - Devolver una película por su título
router.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const movies = await Movie.find({ title: new RegExp(title, 'i') });
    
    if (movies.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por título' });
  }
});

// 4. GET - Devolver los documentos según su género
router.get('/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const movies = await Movie.find({ genre: new RegExp(`^${genre}$`, 'i') });
    
    if (movies.length === 0) return res.status(404).json({ message: 'No hay películas de ese género' });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por género' });
  }
});

// 5. GET - Devolver una película según su _id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    
    if (!movie) return res.status(404).json({ message: 'No existe película con ese ID' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando el ID proporcionado o el formato es inválido' });
  }
});

// 6. POST - Crear una nueva película
router.post('/', async (req, res) => {
  try {
    // Se instancia un nuevo documento con los datos del body
    const nuevaPelicula = new Movie(req.body);
    const peliculaGuardada = await nuevaPelicula.save();
    
    res.status(201).json(peliculaGuardada); // 201 significa "Creado"
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la película, revisa los datos', detalles: error.message });
  }
});

// 7. PUT - Modificar una película existente
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // { new: true } para que nos devuelva el objeto ya modificado
    const peliculaModificada = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!peliculaModificada) {
      return res.status(404).json({ message: 'No se ha encontrado la película para actualizar' });
    }
    
    res.status(200).json(peliculaModificada);
  } catch (error) {
    res.status(400).json({ error: 'Error al modificar la película', detalles: error.message });
  }
});

// 8. DELETE - Eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const peliculaEliminada = await Movie.findByIdAndDelete(id);
    
    if (!peliculaEliminada) {
      return res.status(404).json({ message: 'No se ha encontrado la película para eliminar' });
    }
    
    res.status(200).json({ message: 'Película eliminada correctamente', pelicula: peliculaEliminada });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la película', detalles: error.message });
  }
});

module.exports = router;
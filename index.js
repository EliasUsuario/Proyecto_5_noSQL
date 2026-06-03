const express = require('express');
const connectDB = require('./utils/db'); // Importamos la conexión
const Movie = require('./models/Movie');

const app = express();
const PORT = 3000;

// Se ejecuta la conexión a la base de datos
connectDB();

app.use(express.json());

// 1. Devolver todas las películas
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

// 2. Devolver películas estrenadas a partir de 2010 (Colocado antes del :id para evitar conflictos de rutas)
app.get('/movies/year/2010', async (req, res) => {
  try {
    // $gte = Greater Than or Equal (Mayor o igual que)
    const movies = await Movie.find({ year: { $gte: 2010 } });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por año' });
  }
});

// 3. Devolver una película por su título (Búsqueda insensible a mayúsculas/minúsculas)
app.get('/movies/title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const movies = await Movie.find({ title: new RegExp(title, 'i') });
    
    if (movies.length === 0) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por título' });
  }
});

// 4. Devolver los documentos según su género
app.get('/movies/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    // Búsqueda exacta pero insensible a mayúsculas
    const movies = await Movie.find({ genre: new RegExp(`^${genre}$`, 'i') });
    
    if (movies.length === 0) return res.status(404).json({ message: 'No hay películas de ese género' });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por género' });
  }
});

// 5. Devolver una película según su _id
app.get('/movies/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    
    if (!movie) return res.status(404).json({ message: 'No existe película con ese ID' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error buscando el ID proporcionado o el formato es inválido' });
  }
});


// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de películas escuchando en http://localhost:${PORT}`);
});
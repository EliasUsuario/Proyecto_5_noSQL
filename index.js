const express = require('express');
const connectDB = require('./utils/db');
const movieRoutes = require('./routes/movie.routes'); // Importacion de las rutas

const app = express();
const PORT = 3000;

// Se ejecuta la conexión a la base de datos
connectDB();

app.use(express.json());

// Se ordena a Express que use nuestras rutas para cualquier petición a /movies
app.use('/movies', movieRoutes); 

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
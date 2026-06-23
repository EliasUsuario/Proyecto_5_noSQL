//Esquema de los cines
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    // Aquí hacemos la relación: un cine tiene un array de IDs de películas
    peliculas: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }] 
  },
  {
    timestamps: true
  }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);
module.exports = Cinema;
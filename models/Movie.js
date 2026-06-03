const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true }
  },
  {
    timestamps: true // Para añadir fecha de creación y modificación automáticamente
  }
);


const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
const Joi = require('joi');

const moviesFromDataBase = require('../src/database');
const movies = [...moviesFromDataBase];

const validateRequest = (newMovie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    time: Joi.string().min(1).required(),
    genre: Joi.string().valid('action', 'horror', 'comedy').required(),
  });
  return schema.validate(newMovie);
};

module.exports = {
  getMovie: (req, res) => {
    const movieFound = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movieFound) {
      return res.status(404).send('The given movie Id does not exist');
    }
    res.send(movieFound);
  },
  getMovies: (req, res) => {
    const query = req.query;
    if (query.genre) {
      const filteredMovies = movies.filter((m) => m.genre === query.genre);
      if (JSON.stringify(filteredMovies) === '[]') {
        return res.status(404).send('The given movie genre does not exist');
      }
      return res.send(filteredMovies);
    }
    res.send(movies);
  },
  postMovie: (req, res) => {
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let newMovie = {
      id: movies.length + 1,
      title: req.body.title,
      time: req.body.time,
      genre: req.body.genre,
    };
    movies.push(newMovie);
    res.send(newMovie);
  },
  putMovie: (req, res) => {
    const movieFound = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movieFound)
      return res.status(404).send('The movie with the given Id was not found');
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    movieFound.title = req.body.title;
    movieFound.time = req.body.time;
    movieFound.genre = req.body.genre;
    res.send(movieFound);
  },
  deleteMovie: (req, res) => {
    const movieFound = movies.find((m) => m.id === parseInt(req.params.id));
    if (!movieFound)
      return res.status(404).send('No movie was found with the given ID');
    const index = movies.indexOf(movieFound);
    movies.splice(index, 1);
    res.send(movieFound);
  },
};

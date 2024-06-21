const { Router } = require('express');

const MovieTagsController = require('../controllers/MovieTagsController');

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.post('/:user_id/:movie_id', movieTagsController.create);

module.exports = movieTagsRoutes;
const { Router } = require('express');

const MovieTagsController = require('../controllers/MovieTagsController');

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.post('/:user_id/:movie_id', movieTagsController.create);
movieTagsRoutes.get('/:user_id', movieTagsController.index);

module.exports = movieTagsRoutes;
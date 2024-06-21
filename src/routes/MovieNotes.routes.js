const { Router } = require('express');

const MovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.get('/:id', movieNotesController.show);
movieNotesRoutes.get('/', movieNotesController.index);
movieNotesRoutes.post('/:user_id', movieNotesController.create);
movieNotesRoutes.delete('/:id', movieNotesController.delete);


module.exports = movieNotesRoutes;
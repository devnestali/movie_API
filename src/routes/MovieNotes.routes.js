const { Router } = require('express');

const MovieNotesController = require('../controllers/MovieNotesController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.post('/', movieNotesController.create);
movieNotesRoutes.get('/', movieNotesController.index);
movieNotesRoutes.get('/:id', movieNotesController.show);
movieNotesRoutes.delete('/:id', movieNotesController.delete);


module.exports = movieNotesRoutes;
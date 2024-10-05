const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

notesRoutes.post('/', ensureAuthenticated, notesController.create);

module.exports = notesRoutes;


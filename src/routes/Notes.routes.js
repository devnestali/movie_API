const { Router } = require('express');
const notesRoutes = Router();

const NotesController = require('../controllers/NotesController');
const notesController = new NotesController();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

notesRoutes.use(ensureAuthenticated);

notesRoutes.post('/', notesController.create);
notesRoutes.put('/:id', notesController.update);
notesRoutes.delete('/:id', notesController.delete);
notesRoutes.get('/', notesController.index);
notesRoutes.get('/:id', notesController.show);


module.exports = notesRoutes;


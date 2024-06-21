const { Router } = require("express");

const usersRouter = require("./Users.routes");
const movieNotesRouter = require("./MovieNotes.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movieNotes", movieNotesRouter);

module.exports = routes;
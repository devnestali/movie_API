const { Router } = require("express");

const usersRouter = require("./Users.routes");
const movieNotesRouter = require("./MovieNotes.routes");
const movieTagsRouter = require("./MovieTags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movieNotes", movieNotesRouter);
routes.use("/movieTags", movieTagsRouter);

module.exports = routes;
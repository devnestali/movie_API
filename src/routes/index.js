const { Router } = require("express");

const usersRouter = require("./Users.routes");
const movieNotesRouter = require("./MovieNotes.routes");
const movieTagsRouter = require("./MovieTags.routes");
const sessionsRouter = require("./Sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movieNotes", movieNotesRouter);
routes.use("/movieTags", movieTagsRouter);

module.exports = routes;
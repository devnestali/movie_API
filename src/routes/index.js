const { Router } = require("express");

const usersRouter = require("./Users.routes");
const notesRouter = require("./Notes.routes");
const sessionsRouter = require("./Sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/sessions", sessionsRouter);


module.exports = routes;
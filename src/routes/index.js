const { Router } = require("express");

const usersRouter = require("./Users.routes")

const routes = Router();

routes.use("/users", usersRouter);

module.exports = routes;
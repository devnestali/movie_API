const knex = require("../database/knex");
const AppError = require('../utils/AppError');
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken")
const authConfig = require("../configs/auth");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if(!user) {
      throw new AppError("E-mail e/ou senha incorretos!");
    };

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail e/ou senha incorretos!");
    };

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    const necessaryInformation = {
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };

    return response.json({
      user: necessaryInformation,
      token,
    });
    
  }

}

module.exports = SessionsController;
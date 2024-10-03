const { hash, compare } = require('bcryptjs'); 

const knex = require('../database/knex');

const AppError = require('../utils/AppError');
const DataChecks = require('../utils/DataChecks');
const dataChecks = new DataChecks();

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    dataChecks.hadAllDataSent([name, email, password]);

    const emailExist = await knex("users").where({ email }).first();

    dataChecks.emailAlreadyExists(emailExist);

    const hashedPassword = await hash(password, 8);

    const formattedName = name.trim();
    const formattedEmail = email.trim();

    await knex("users").insert({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    return response.json({
      status: 201,
      message: "Usuário cadastrado com sucesso!",
    });
  }

  async update(request, response) {

    return response.json();

  }
}

module.exports = UsersController
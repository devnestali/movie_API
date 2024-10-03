const { hash, compare } = require('bcryptjs'); 

const knex = require('../database/knex')

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
    const user_id = request.user.id;
    
    const {
      newName,
      newEmail,
      newPassword,
      currentPassword
    } = request.body;

    const userInfo = await knex("users").where({ id: user_id }).first();

    let successFullyUpdated;
    let updatedData = { ...userInfo };
    
    dataChecks.userExists(userInfo);

    if(newName) {
      const formattedName = newName.trim();
      updatedData.name = formattedName
      successFullyUpdated = true;
    };

    if(newEmail) {
      const emailRegistered = await knex("users").where({ email: newEmail }).first();

      dataChecks.thisEmailBelongToThisUser(userInfo, emailRegistered);

      const formattedEmail = newEmail.trim();

      updatedData.email = formattedEmail;
      successFullyUpdated = true;
    };

    if(newPassword) {
      dataChecks.isThisTheCurrentPassword(currentPassword);

      const passwordCompare = await compare(currentPassword, userInfo.password);

      dataChecks.thePasswordsHasAMatch(passwordCompare);

      const hashedNewPassword = await hash(newPassword, 8);

      updatedData.password = hashedNewPassword;
      successFullyUpdated = true;
    }

    if(successFullyUpdated) {
      await knex("users").where({ id: user_id}).update({
        name: updatedData.name,
        email: updatedData.email,
        password: updatedData.password,
        updated_at: knex.fn.now(),
      })

      const userUpdated = {
        name: updatedData.name,
        email: updatedData.email,
        avatar: updatedData.avatar,
      }
      
      return response.json({
        status: 201,
        message: "Usuário atualizado com sucesso!",
        userUpdated,
      });
    }
    
    dataChecks.dataWasNotSent();
  }
}

module.exports = UsersController
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

const DataChecks = require("../utils/DataChecks");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;
    
    const diskStorage = new DiskStorage();
    const dataChecks = new DataChecks();

    const user = await knex("users")
      .where({ id: user_id })
      .first();

    dataChecks.notAuthenticated(user);

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(avatarFileName);
    
    user.avatar = fileName;

    await knex("users").where({ id: user_id}).update(user);

    const necessaryInformation = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }

    return response.json(necessaryInformation);
  }
    
}

module.exports = UserAvatarController;
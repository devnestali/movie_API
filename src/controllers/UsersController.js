const AppError = require("../utils/AppError");

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if(!name || !email) {
      throw new AppError("Nome e E-mail são obrigatórios");
    }

    response.status(201).json({ name, email, password });
  }
}

module.exports = UsersController;
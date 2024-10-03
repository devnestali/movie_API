/* const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieTagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const movieTags = await knex('movieTags')
      .where({ user_id })
      .groupBy('name');

    return response.json(movieTags);
  }
}

module.exports = MovieTagsController; */
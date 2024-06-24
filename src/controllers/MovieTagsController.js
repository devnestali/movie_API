const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieTagsController {
  async create(request, response) {
    const { user_id, movie_id } = request.params;
    const { name } = request.body;

    if(!name) {
      throw new AppError('O nome do gênero é obrigatório');
    }

    await knex('movieTags').insert({
      movie_id,
      user_id,
      name
    });

    return response.json();
  }

  async index(request, response) {
    const { user_id } = request.params;

    const movieTags = await knex('movieTags')
      .where({ user_id })
      .orderBy('name');

    return response.json({ movieTags });
  }
}

module.exports = MovieTagsController;
const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;

    if(!rating || rating < 1 || rating > 5) {
      throw new AppError('A avaliação precisa ser um número entre 1 e 5');
    }
    
    await knex('movieNotes').insert({
      title,
      description,
      rating,
      user_id
    });

    return response.json();
     
  }

  async show(request, response) {
    const { id } = request.params;

    const movieNote = await knex('movieNotes').where({ id }).first();
    const movieTags = await knex('movieTags').where({ movie_id: id }).orderBy("name");

    return response.json({
      ...movieNote,
      movieTags
     });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('movieNotes').where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { user_id, title, movieTag } = request.query;

    let movieNotes;

    if(movieTag) {
      const filteredTags = movieTag.split(',').map(tag => tag.trim()); 
      
      movieNotes = await knex('movieTags')
        .whereIn('name', filteredTags);
    } else {
      movieNotes = await knex('movieNotes')
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }
    
    return response.json({ movieNotes });
  }
}

module.exports = MovieNotesController;
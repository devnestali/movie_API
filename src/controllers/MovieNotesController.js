const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const user_id = request.user.id;

    if(!rating || rating < 1 || rating > 5) {
      throw new AppError('A avaliação precisa ser um número entre 1 e 5');
    }
    
    const [movie_id] = await knex('movieNotes').insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        name,
        user_id
      }
    });

    await knex('movieTags').insert(tagsInsert);

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
    const { title, movieTag } = request.query;
    const user_id = request.user.id;
    
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
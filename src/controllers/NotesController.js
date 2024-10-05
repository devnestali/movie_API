const knex = require('../database/knex');

const DataChecks = require("../utils/DataChecks");
const dataChecks = new DataChecks();

class NotesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { 
      title,
      description,
      rating,
      tags
    } = request.body;

    dataChecks.thisTitleIsEmpty(title);
    dataChecks.isANumber(rating);

    const formattedTitle = title.trim();
    const formattedDescription = description.trim();

    const note_id = await knex("notes").insert({
      title: formattedTitle,
      description: formattedDescription,
      rating,
      user_id,
    });

      const tagsOfThisNote = tags.map(tag => {
      const formattedTag = tag.trim();

      return {
        note_id,
        user_id,
        name: formattedTag,
      };
    }); 

    await knex("tags").insert(tagsOfThisNote);
    
    return response.status(201).json({
      status: 201,
      message: "Nota cadastrada com sucesso!",
    });
  }
}

module.exports = NotesController;
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

    const noteTags = tags.map(tag => {
    const formattedTag = tag.trim();

    return {
      note_id: note_id[0],
      user_id,
      name: formattedTag,
      };
    }); 

    await knex("tags").insert(noteTags);
    
    return response.status(201).json({
      status: 201,
      message: "Nota cadastrada com sucesso!",
    });
  }

  async update(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;
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

    await knex("notes").where({ id }).update({
      title: formattedTitle,
      description: formattedDescription,
      rating,
      user_id,
    });

    if(tags) {
      const noteTags = tags.map(tag => {
        const formattedTag = tag.trim();

        return {
          note_id: id,
          user_id,
          name: formattedTag,
        };
      });

      await knex("tags").where({ note_id: id}).delete();
    
      await knex("tags").insert(noteTags);
    }

    return response.status(201).json({
      status: 201,
      message: "Nota cadastrada com sucesso!",
    })
  }
}

module.exports = NotesController;
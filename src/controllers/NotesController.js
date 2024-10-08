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
          note_id: Number(id),
          user_id,
          name: formattedTag,
        };
      });
      await knex("tags").where({ note_id: id }).delete();
      
      await knex("tags").insert(noteTags);
    } 



    return response.status(201).json({
      status: 201,
      message: "Nota cadastrada com sucesso!",
    })
  }

  async delete(request, response) {
    const { id } = request.params;

    const noteData = await knex("notes").where({ id }).first();

    dataChecks.thisNoteExists(noteData);

    await knex("notes").where({ id }).delete();

    return response.status(201).json({
      status: 201,
      message: "Nota deletada com sucesso!",
    });
  }

  async index(request, response) {
    const { title } = request.query;
    const user_id = request.user.id;

    const userNotes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("updated_at");

    const tags = await knex("tags").where({ user_id });
    
    const notesWithTags = userNotes.map(note => {
      const tagsOfThisNote = tags.filter(tag => tag.note_id == note.id);

      return {
        ...note,
        tags: tagsOfThisNote,
      };
    });
    
    return response.status(201).json(notesWithTags);
  }

  async show(request, response) {
    const { id } = request.params;

    const noteInfo = await knex("notes").where({ id }).first();

    dataChecks.thisNoteExists(noteInfo);

    const tagsOfThisNote = await knex("tags").where({ note_id: id });

    return response.status(202).json({
      ...noteInfo,
      tags: tagsOfThisNote,
    })

  }
}

module.exports = NotesController;
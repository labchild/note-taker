const fs = require('fs');
const path = require('path');

// create a new note
const createNote = (body, notesArr) => {
    const note = body;
    notesArr.push(note);

    // add note to notes json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );

    return note;
};

// find a note by id
const findById = (id, notesArr) => {
    const result = notesArr.filter(note => note.id == id)[0];
    return result;
};

// update a note with matching id
const updateNote = (body, notesArr) => {
    const note = notesArr.filter(note => note.id === body.id)[0];
    note.title = body.title;
    note.text = body.text;

    // remove old note from arr
    notesArr.splice(notesArr.findIndex(note => note.id === body.id), 1);
    // add updated note to array
    notesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );

    return note;
}

module.exports = { 
    createNote,
    findById,
    updateNote
}
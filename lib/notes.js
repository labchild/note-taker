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

    // remove old note from arr, add updated note to array
    oldNoteIndex = notesArr.findIndex(note => note.id === body.id);
    notesArr.splice(oldNoteIndex, 1, note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );

    return note;
};

const deleteNote = (id, notesArr) => {
    // find the note with matching id
    const noteIndex = notesArr.findIndex(note => note.id === id);
    // pop from array
    notesArr.splice(noteIndex, 1);
    // write new data to file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );

    return notesArr;
};

module.exports = { 
    createNote,
    findById,
    updateNote,
    deleteNote
}
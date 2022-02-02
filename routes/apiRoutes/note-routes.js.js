const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { createNote } = require('../../lib/notes');

// get all notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// get one note by id
router.get('/notes/:id', (req, res) => {
    const result = findById(req.param.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404).json({ message: 'No note with that id' });
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const result = createNote(req.body, notes);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Request formatted incorrectly' });
    }
});
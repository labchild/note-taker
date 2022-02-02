const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { 
    createNote,
    findById,
    updateNote
} = require('../../lib/notes');

// get all notes
router.get('/', (req, res) => {
    res.json(notes);
});

// get one note by id
router.get('/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404).json({ message: 'No note with that id' });
    }
});

// create a note
router.post('/', (req, res) => {
    req.body.id = notes.length.toString();
    
    const result = createNote(req.body, notes);

    if (result) {
        res.json(result);
    } else {
        res.status(400).json({ message: 'Request formatted incorrectly' });
    }
});

// update an existing note
router.put('/:id', (req, res) => {
    const result = updateNote(req.body, notes);

    if (result) {
        res.json(result);
    } else {
        res.status(400).json({ message: 'Request formatted incorrectly' });
    }
});

// delete a note
router.delete('/:id', (req, res) => {
    
})

module.exports = router;
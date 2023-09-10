const express = require('express');
const router = express.Router();
const notesCtrl = require('../../controllers/api/notes');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/notes'

// POST /api/notes
router.post('/', ensureLoggedIn, notesCtrl.create);

// GET /api/notes
router.get('/', ensureLoggedIn, notesCtrl.index);

// DELETE /api/notes/:id
router.delete('/:id', ensureLoggedIn, notesCtrl.delete);

// PUT /api/notes/:id
router.put('/:id', ensureLoggedIn, notesCtrl.edit);

module.exports = router;
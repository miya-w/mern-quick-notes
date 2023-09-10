const User = require('../../models/user');
const Note = require('../../models/note');

module.exports = {
  create,
  index,
  delete: deleteNote,
  edit
};

async function create(req, res) {
  try {
    const newNote = {
      text: req.body.newNote,
      user: req.user._id
    };
    const note = await Note.create(newNote);
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function index(req, res) {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function deleteNote(req, res) {
  try {
    const note = await Note.findOneAndDelete({_id: req.params.id});
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function edit(req, res) {
  try {
    const note = await Note.findOneAndUpdate({ _id: req.params.id }, { text: req.body.editNote }, { new: true });
    res.json(note);
  } catch (err) {
    res.status(400).json(err);
  }
}
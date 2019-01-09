console.log('Starting node.js');

const fs = require('fs');

const fetchAllNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    console.log(e);
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  console.log(`adding note with title = ${title} and body = ${body}`);
  const notes = fetchAllNotes();
  const note = {
    title,
    body
  };

  const duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const listNotes = () => {
  console.log('listing all notes');
  return fetchAllNotes();
};

const readNote = (title) => {
  console.log(`reading note with title = ${title}`);
  const notes = fetchAllNotes().filter(note => note.title === title);
  return notes[0];
};

const removeNote = (title) => {
  console.log(`removing note with title = ${title}`);
  const notesBeforeRemoval = fetchAllNotes();
  const notesAfterRemoval = notesBeforeRemoval.filter(note => note.title !== title);
  saveNotes(notesAfterRemoval);
  return notesBeforeRemoval.length - notesAfterRemoval.length;
};

const logNote = (note, msg) => {
  console.log(msg);
  console.log('--');
  console.log(`Title=${note.title}`);
  console.log(`Body=${note.body}`);
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
  logNote
};
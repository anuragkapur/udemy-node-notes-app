console.log('Starting app.js');

const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];

if (command === 'add') {

  const note = notes.addNote(argv.title, argv.body);
  note === undefined ?
    console.log(`note with title=${argv.title} already exists`) :
    notes.logNote(note, 'note added successfully');

} else if (command === 'list') {

  notes.listNotes();

} else if (command === 'read') {

  const note = notes.readNote(argv.title);
  note === undefined ?
    console.log(`note with title=${argv.title} not found`) :
    notes.logNote(note, 'note found');

} else if (command === 'remove') {

  const countOfNotesRemoved = notes.removeNote(argv.title);
  const msg = countOfNotesRemoved === 0 ? 'no notes removed' : `${countOfNotesRemoved} note(s) removed successfully`;
  console.log(msg)

}else {

  console.log('command not recognised');

}

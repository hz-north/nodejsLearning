const fs = require("fs");

// fetching data from json
var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync("notes-data.json");
    return JSON.parse(noteString);
  } catch (error) {
    return [];
  }
};
// DRY principle and logNote
var logNote = (note) => {
  debugger;
  console.log("---");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};
//
// saving data to json
var saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = { title, body };
  var duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title === title);
  return filteredNote[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title !== title);
  saveNotes(filteredNote);
  return notes.length !== filteredNote.length;
};

module.exports = { addNote, getAll, getNote, removeNote, logNote };

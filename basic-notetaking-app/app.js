console.log("Starting App");
const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes");
const { title } = require("process");
const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t",
};
const bodyOptions = { describe: "Title of note", demand: true, alias: "b" };
const argv = yargs
  .command("add", "add a new note", {
    title: titleOptions,
    body: bodyOptions,
  })
  .command("list", "list all notes")
  .command("read", "read a note", {
    title: titleOptions,
  })
  .command("remove", "remove a note", {
    title: titleOptions,
  })
  .help().argv;
var command = argv._[0];
//console.log('Command', command);
//console.log('Process', process.argv);
//console.log('Yargs', argv);

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    notes.logNote(note);
  } else {
    console.log("Note title taken");
  }
} else if (command === "list") {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else if (command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note Found");
    notes.logNote(note);
  } else {
    console.log("Note not found!");
  }
} else if (command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? "Note was removed" : "Note was not found!";
  console.log(message);
} else {
  console.log("Command not recognized");
}

import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMesage, setErrorMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    // console.log("effect");

    noteService
      .getAll()

      .then((initialNotes) => {
        // console.log("promise fulfilled");
        setNotes(initialNotes);
      });
  }, []);
  // console.log("render", notes.length, "notes");

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const chagedNote = { ...note, important: !note.important };

    noteService
      .update(id, chagedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setMessageType("error");
        setTimeout(() => {
          setErrorMessage(null);
          setMessageType(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });

    // console.log(`importance of ${id} needs to be toggled`);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    };

    noteService
      .create(noteObject)

      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
        setErrorMessage("Note added successfully!");
        setMessageType("success");
        setTimeout(() => {
          setErrorMessage(null);
          setMessageType(null);
        }, 5000);
      });

    // console.log("button clicked", event.target);
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((notes) => notes.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMesage} type={messageType} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

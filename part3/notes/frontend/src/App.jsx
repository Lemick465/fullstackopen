import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/Notes"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then((initialNotes) => {
        setNewNote(notes.concat(initialNotes))
        setNewNote('')
      })

    setNewNote("")
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then((initialNotes) => {
        setNotes(notes.map((note) => note.id === id ? initialNotes : note))
    }).catch((error) => {
      setErrorMessage(
        `Note '${note.content}' was already removed from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewNote(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
          <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
}

export default App
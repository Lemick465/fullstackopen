import { useEffect, useState } from "react"
import noteService from "./services/Notes"
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll("http://localhost:3001/notes")
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
      .create("http://localhost:3001/notes", noteObject)
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
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(url, changedNote)
      .then((initialNotes) => {
        setNotes(notes.map((note) => note.id === id ? initialNotes : note))
    }).catch((error) => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNewNote(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  );
}

export default App
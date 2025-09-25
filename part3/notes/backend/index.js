require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

morgan.token("body", request => {
  return JSON.stringify(request.body)
})

const requestLogger = (request, response, next) => {
  console.log("Method", request.method)
  console.log("Path", request.path)
  console.log("Body", request.body)
  console.log("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static("dist"))
app.use(requestLogger)

app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => {
      response.json(notes)
    })
})

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post("/api/notes", (request, response) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  })

  response.json(note)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
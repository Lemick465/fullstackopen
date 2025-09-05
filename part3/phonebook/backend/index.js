const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

morgan.token("body", request => {
    return JSON.stringify(request.body)
})

app.use(cors())

app.use(express.static("dist"))

app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const generateId = () => {
    const maxId = persons.length > 0 ?
        Math.max(...persons.map((person) => person.id))
        : 0
    return (maxId + 1)
}

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    }
  ]

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date().toLocaleString()}</p>`)
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)
    if(!person){
        response.status(404).json({
            error: "Person not found!"
        })
    }
    response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)
    if(!person){
        response.status(404).json({
            error: "Person not found!"
        })
    }
    const newPersons = persons.filter((person) => person.id !== id)
    persons = newPersons
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body

    const nameExists = persons.find((person) => person.name === body.name)

    if(!body.name || !body.number){
        return response.status(400).json({
            error: "name or number is missing."
        })
    }else if(nameExists){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

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


app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date().toLocaleString()}</p>`)
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then((person) => {
        response.json(person)
    })
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
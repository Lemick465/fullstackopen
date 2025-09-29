const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.message === "CastError") {
    return response.status(400).send({ error: "malformated id" });
  }
  next(error);
};

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p> <p>${Date().toLocaleString()}</p>`
  );
});

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  }).catch((error) => next(error))
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  }).catch((error) => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then((result) => {
    if (!result) {
      return response.status(404).end();
    } else {
      Person.findByIdAndDelete(request.params.id).then((result) => {
        response.status(204).end();
      });
    }
  })
  .catch((error) => next(error))
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing.",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end();
    }else if(person.name === name && person.number === number){
      return response.send({ error: "No update to be made."})
    }else if(person.name === name && person.number !== number){
      person.number = number
      person.save().then((updatedPerson) => {
        return response.json(updatedPerson)
      })
    }
  }).catch((error) => next(error))
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

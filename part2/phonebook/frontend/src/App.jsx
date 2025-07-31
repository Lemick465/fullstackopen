import { useEffect, useState } from "react";
import personService from "./services/Person"
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const searchResult = persons.filter((person) =>
    person.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleAddPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase());
    if (nameExists) {
      return alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length > 0 ? Math.max(...persons.map((person) => person.id)) + 1: 1).toString(),
      };
      personService
        .create(newPerson)
        .then((newEntry) => {
          setPersons(persons.concat(newEntry));
          setNewName("");
          setNewNumber("");
        })
    }
  };

  useEffect(() => {
    personService
      .getAll()
      .then((initialNotes) => {
        setPersons(initialNotes)
      })
  }, [])

  const handleDelete = () => {
    console.log("Deleted")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchChange={handleSearchChange}
        search={search}
        searchResult={searchResult} />

      <h3>add a new number</h3>
      <PersonForm onFormSubmit={handleAddPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        name={newName}
        number={newNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} onDeleteClick={handleDelete}/>
    </div>
  );
};

export default App;

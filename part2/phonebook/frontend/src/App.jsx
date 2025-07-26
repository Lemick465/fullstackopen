import { useEffect, useState } from "react";
import axios from "axios"
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
        id:
          persons.length > 0
            ? Math.max(...persons.map((person) => person.id)) + 1
            : 1,
      };
      axios.post("http://localhost:3001/persons", newPerson)
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

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
      <Persons persons={persons} />
    </div>
  );
};

export default App;

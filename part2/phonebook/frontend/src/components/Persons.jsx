const Persons = ({ persons, onDeleteClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={onDeleteClick}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;

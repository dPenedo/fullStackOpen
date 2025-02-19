const AddPersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
}) => {
  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    const isNameTaken = persons.some((person) => person.name === newName);

    if (isNameTaken) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addNote}>
      <div>
        name: <input value={newName} onChange={handleNameInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInputChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;

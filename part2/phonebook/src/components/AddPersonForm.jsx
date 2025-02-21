import personsService from "../services/persons";
import { useEffect } from "react";

const AddPersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
}) => {
  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();

    const isNameTaken = persons.some((person) => person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (isNameTaken) {
      if (
        window.confirm(
          `${newName} is already on the list, do you want to update the number?`,
        )
      ) {
        const repeatedPerson = persons.find(
          (person) => person.name === newName,
        );
        personsService
          .updatePerson(repeatedPerson.id, personObject)
          .then((response) => {
            setNewName("");
            setNewNumber("");
            setPersons(persons.concat(response.data));
          });
      }
    } else {
      personsService.createPerson(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
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

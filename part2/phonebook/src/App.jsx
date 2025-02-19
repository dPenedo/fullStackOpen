import { useState } from "react";
import AddPersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "020-6345789" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const personsToShow = persons.filter((person) =>
    person.name.toUpperCase().includes(newFilter.toUpperCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <AddPersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <Numbers personsToShow={personsToShow} />
    </div>
  );
};

export default App;

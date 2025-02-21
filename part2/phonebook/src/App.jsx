import { useState, useEffect } from "react";
import AddPersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("primer get a persons: ", response);
      setPersons(response.data);
    });
  }, []);

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
      <Numbers setPersons={setPersons} personsToShow={personsToShow} />
    </div>
  );
};

export default App;

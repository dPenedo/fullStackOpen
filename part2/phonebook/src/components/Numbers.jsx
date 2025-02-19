const Numbers = ({ personsToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Numbers;

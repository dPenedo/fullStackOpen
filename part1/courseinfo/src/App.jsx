function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  const Header = ({ course }) => {
    console.log(course);
    return <h1>{course}</h1>;
  };
  const Content = ({ parts }) => {
    return (
      <>
        {parts.map((p, index) => (
          <Part key={index} name={p.name} num={p.exercises} />
        ))}
      </>
    );
  };
  const Part = ({ name, num }) => {
    return (
      <p>
        {name} {num}
      </p>
    );
  };
  const Total = ({ parts }) => {
    const sumOfExercises = (parts) => {
      let total = 0;
      parts.forEach((p) => (total += p.exercises));
      return total;
    };
    const totalNumber = sumOfExercises(parts);
    return (
      <>
        <p>Number of exercises {totalNumber}</p>
      </>
    );
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default App;

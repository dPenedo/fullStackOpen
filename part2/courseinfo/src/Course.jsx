const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((acummulator, currentValue) => {
    return acummulator + currentValue.exercises;
  }, 0);
  return (
    <>
      <Header header={course.name} />
      {course.parts.map((part) => (
        <Part
          key={`${course.id}${part.id}`}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      <p>
        <b>Total of {totalExercises} exercises </b>
      </p>
    </>
  );
};

export default Course;

// componente Header
const Header = ({ course }) => {
  console.log(course);
  return <h1>{course}</h1>;
};

// Componente Content
const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
    </div>
  );
};

// Componente Total
const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  console.log(total);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  console.log("Prueba");

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;

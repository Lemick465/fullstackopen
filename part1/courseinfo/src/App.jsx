const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.title} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part title={props.title1} exercises={props.exercises1} />
      <Part title={props.title2} exercises={props.exercises2} />
      <Part title={props.title3} exercises={props.exercises3} />
    </div>
  );
};

const Footer = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
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
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
        title1={course.parts[0].name} exercises1={course.parts[0].exercises}
        title2={course.parts[1].name} exercises2={course.parts[1].exercises}
        title3={course.parts[2].name} exercises3={course.parts[2].exercises}
      />
      <Footer total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  );
};

export default App;

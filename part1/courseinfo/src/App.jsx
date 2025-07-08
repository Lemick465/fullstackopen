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
  const course = "Half Stack application development";
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content
        title1={parts[0].name} exercises1={parts[0].exercises}
        title2={parts[1].name} exercises2={parts[1].exercises}
        title3={parts[2].name} exercises3={parts[2].exercises}
      />
      <Footer total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
};

export default App;

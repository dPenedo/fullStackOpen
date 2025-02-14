import { useState } from "react";

const Button = ({ text }) => {
  return <button>{text}</button>;
};

const Counter = ({ text, number }) => {
  return (
    <p>
      <span>{text}</span> <span>{number}</span>
    </p>
  );
};

const App = () => {
  const [count, setCount] = useState([0, 0, 0]);

  return (
    <>
      <h2>Give fiiedback</h2>
      <Button text="Good" />
      <Button text="Neutral" />
      <Button text="Bad" />
      <h2>Give statistic</h2>
      <Counter text="Good" number="0" />
      <Counter text="Neutral" number="0" />
      <Counter text="Bad" number="0" />
    </>
  );
};

export default App;

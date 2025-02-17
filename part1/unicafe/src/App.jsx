import { useState } from "react";

const Button = ({ text, voteToHanddle, setVotes }) => {
  const handleClick = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voteToHanddle]: prevVotes[voteToHanddle] + 1,
    }));
  };
  return <button onClick={handleClick}>{text}</button>;
};

const Counter = ({ text, number }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text}</td>
      <td>{value} </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allVotes = good + neutral + bad;
  const averageVotes = (good - bad) / allVotes;
  const positivePercent = (good / allVotes) * 100;
  if (allVotes) {
    return (
      <>
        <StatisticLine text={"All"} value={allVotes} />
        <StatisticLine text={"Average"} value={averageVotes} />
        <StatisticLine text={"Positive"} value={positivePercent} />
      </>
    );
  }
  return (
    <tr>
      <td>No feedback Given</td>
    </tr>
  );
};

const App = () => {
  const [votes, setVotes] = useState({ good: 0, neutral: 0, bad: 0 });

  return (
    <>
      <h2>Give fiiedback</h2>
      <Button setVotes={setVotes} voteToHanddle="good" text="Good" />
      <Button setVotes={setVotes} voteToHanddle="neutral" text="Neutral" />
      <Button setVotes={setVotes} voteToHanddle="bad" text="Bad" />
      <h2>Statistic</h2>
      <table>
        <tbody>
          <Counter text="Good" number={votes.good} />
          <Counter text="Neutral" number={votes.neutral} />
          <Counter text="Bad" number={votes.bad} />
          <Statistics
            good={votes.good}
            neutral={votes.neutral}
            bad={votes.bad}
          />
        </tbody>
      </table>
    </>
  );
};

export default App;

import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(false);
  const [votes, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  const [mostVoted, setMostVoted] = useState(null);

  const voteAnecdote = () => {
    if (!voted) {
      const copyVotes = { ...votes };
      copyVotes[selected] += 1;
      setVote(copyVotes);
      setVoted(true);
    }
  };

  let getMostVoted = () => {
    const values = Object.values(votes);
    let mostVoted = 0;
    for (let i = 0; i < values.length; i++) {
      const element = values[i];
      if (element > mostVoted) {
        mostVoted = element;
      }
    }
    console.log(votes);
    return mostVoted;
  };

  const setRandomSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    setVoted(false);
    setMostVoted(getMostVoted());
  };
  return (
    <>
      <h4>Acecdote of the day</h4>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>

      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={setRandomSelected}>Next anecdote</button>
      <h4>Anecdote with most votes</h4>
      <div>{anecdotes[mostVoted]}</div>
      <div>Has {votes[mostVoted]} votes</div>
    </>
  );
};

export default App;

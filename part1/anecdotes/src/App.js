import React, { useState } from "react";


const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getFave = () => {
    const indexOfMaxValue = votes.indexOf(Math.max(...votes));
    return indexOfMaxValue;
  };

  return (
    <div>
      <h1>anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <Button
          text="random anecdote"
          handleClick={() =>
            setSelected(Math.floor(Math.random() * anecdotes.length))
          }
        />
        <Button
          text="vote"
          handleClick={() => {
            const copy = [...votes];
            copy[selected]++;

            setVotes(copy);
            console.log("votes ", copy);
          }}
        />
      </div>

      <h1>most upvoted anecdote</h1>
      <div>{anecdotes[getFave()]}</div>
    </div>
  );
};



export default App;

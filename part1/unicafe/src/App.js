import React, { useState } from "react";

// UNICAFE

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  // <div>{text} {value}</div>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0)
    return (
      <>
        <h1>statistics</h1>
        <div> no feedback given</div>
      </>
    );

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + bad + neutral} />
        <Statistic
          text="average"
          value={(good - bad) / (good + bad + neutral)}
        />
        <Statistic
          text="positive"
          value={(good / (good + bad + neutral)) * 100 + "%"}
        />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <React.Fragment>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </React.Fragment>
  );
};

export default App;

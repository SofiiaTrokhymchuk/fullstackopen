import { useState } from 'react';

const StatisticLine = ({ text, value, inPercentage }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>
        {value} {inPercentage && '%'}
      </td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine
              text={'good'}
              value={good}
            />
            <StatisticLine
              text={'neutral'}
              value={neutral}
            />
            <StatisticLine
              text={'bad'}
              value={bad}
            />
            <StatisticLine
              text={'all'}
              value={all}
            />
            <StatisticLine
              text={'average'}
              value={average}
            />
            <StatisticLine
              text={'positive'}
              value={positive}
              inPercentage
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;

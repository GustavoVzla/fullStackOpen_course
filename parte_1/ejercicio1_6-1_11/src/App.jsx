import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <table>
        <tbody>
          <h2>Statistics</h2>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine
            text="Positive"
            value={`${positivePercentage.toFixed(2)} %`}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // calcula el total de comentarios
  const total = good + neutral + bad;

  // calcula la puntuación promedio
  const average = total === 0 ? 0 : (good - bad) / total;

  // calcula el porsentaje de comentarios positivos
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;

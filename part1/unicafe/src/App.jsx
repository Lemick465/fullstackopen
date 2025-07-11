import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const Statistics = ({ title, good, neutral, bad }) => {
  const total = good + neutral + bad;

  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;
  return (
    <div>
      <Title text={title} />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage}%</p>
    </div>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [statistics, setStatistics] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleOnGoodClick = () => {
    const updatedGood = {
      ...statistics,
      good: statistics.good + 1,
    };
    setStatistics(updatedGood);
  };

  const handleOnNeutralClick = () => {
    const updatedNeutral = {
      ...statistics,
      neutral: statistics.neutral + 1,
    };
    setStatistics(updatedNeutral);
  };

  const handleOnBadClick = () => {
    const updatedBad = {
      ...statistics,
      bad: statistics.bad + 1,
    };
    setStatistics(updatedBad);
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={handleOnGoodClick} />
      <Button text="neutral" onClick={handleOnNeutralClick} />
      <Button text="bad" onClick={handleOnBadClick} />
      <Statistics
        title="Statistics"
        good={statistics.good}
        neutral={statistics.neutral}
        bad={statistics.bad}
      />
    </div>
  );
};

export default App;

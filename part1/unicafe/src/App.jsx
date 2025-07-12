import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [posPercentage, setPosPercentage] = useState(0)

  const handleOnGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    const updatedAverage = (updatedGood - bad) / updatedTotal
    const updatedPositive = (updatedGood / updatedTotal) * 100

    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPosPercentage(updatedPositive)

  };

    const handleOnNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    const updatedAverage = (good - bad) / updatedTotal
    const updatedPositive = (good / updatedTotal) * 100

    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPosPercentage(updatedPositive)
  };

  const handleOnBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    const updatedAverage = (good - updatedBad) / updatedTotal
    const updatedPositive = (good / updatedTotal) * 100

    setBad(updatedBad)
    setTotal(updatedTotal)
    setAverage(updatedAverage)
    setPosPercentage(updatedPositive)
  };

  if(total === 0){
    return(
      <div>
      <Title text="give feedback" />
      <Button text="good" onClick={handleOnGoodClick}/>
      <Button text="neutral" onClick={handleOnNeutralClick}/>
      <Button text="bad" onClick={handleOnBadClick}/>
      <Title text="statistics" />
      <p>No feedback available</p>
      </div>
    )
  }

  return (
    <div>
      <Title text="give feedback" />
      <Button text="good" onClick={handleOnGoodClick}/>
      <Button text="neutral" onClick={handleOnNeutralClick}/>
      <Button text="bad" onClick={handleOnBadClick}/>
      <Title text="statistics" />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={posPercentage} />
    </div>
  );
};

export default App;

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.name}</button>
  )
}
const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {

  if ((props.good + props.neutral + props.bad) === 0){
    return <p>No feedback given.</p>
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='all' value={props.good + props.neutral + props.bad} />
        <Statistic text='average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
        <Statistic text='positive' value={(props.good / (props.good + props.neutral + props.bad)*100)+'%'} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1);
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleClickBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleClickGood} name='Good'/>
      <Button handleClick={handleClickNeutral} name='Neutral'/>
      <Button handleClick={handleClickBad} name='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
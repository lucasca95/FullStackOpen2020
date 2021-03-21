import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0);

  const handleClickNewAnecdote = () => {
    setSelected(Math.floor(Math.random()*props.anecdotes.length));
  }
  
  const handleClickVote = () => {
    const newVotes = { ...votes };
    newVotes[selected] += 1;

    let i=0;
    let stop=false;
    while ((i<props.anecdotes.length) && (!stop)){
      if(newVotes[i] > newVotes[mostVotes]){
        setMostVotes(i);
        stop = true;
      }
      i += 1;
    }
    setVotes(newVotes);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={handleClickVote} text='vote' />
      <Button handleClick={handleClickNewAnecdote} text='new anecdote' />

      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}
      <br />
      has {votes[mostVotes]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
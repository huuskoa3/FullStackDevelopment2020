import React, { useState } from 'react'
import ReactDOM from 'react-dom'


//komponentti palauttaa anekdootin näytettäväksi
const Render = (props) => {
    return (
      <p>{props.list[props.select]}</p>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState({state: 0, votes: [0,0,0,0,0,0]})

// määriteltynä on nyt kaksi funktiota: anekdootin valintaan "handleAnec" ja
// äänen antamiseen "handleVotes"

  const handleAnec = () => {
    const newD = {
      state: Math.floor(Math.random()*anecdotes.length),
      votes: selected.votes
    }
    setSelected(newD)
  }

  const handleVotes = () => {
    const copy = [...selected.votes]
    copy[selected.state] += 1
    const newD = {
      state: selected.state,
      votes: copy
    }
    setSelected(newD)
  }

  return (
    <div>
    <div>
      {props.anecdotes[selected.state]}
      <Render select = {selected} list = {anecdotes}/>
      <button onClick = {handleAnec}>next anecdote</button>
      <button onClick = {handleVotes}>vote</button>
      <p>has {selected.votes[selected.state]} votes </p>
    </div>
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

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return (
    <div>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.good-props.bad}</p>
      <p>Average: {(props.good+props.neutral+props.bad)/3}</p>
      <p>Positive: {(props.good/((props.good+props.neutral+props.bad)))*100} %</p>
    </div>
  )
}
  // komponentti Render ilmoittaa, mikäli palautetta ei ole annettu
const Render = (props) => {
  if(props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
    return (
      <div>
        <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad}/>
      </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick = {()=>setGood(good+1)}> good </button>
      <button onClick = {()=>setNeutral(neutral+1)}> neutral </button>
      <button onClick = {()=>setBad(bad+1)}> bad </button>
      <h1>Statistics</h1>
      <Render good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

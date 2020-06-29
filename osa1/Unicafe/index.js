import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text = "Good" val = {props.good}/>
      <StatisticLine text = "Neutral" val = {props.neutral}/>
      <StatisticLine text = "Bad" val = {props.bad}/>
      <StatisticLine text = "All" val = {props.good-props.bad}/>
      <StatisticLine text = "Average" val = {(props.good+props.neutral+props.bad)/3}/>
      <StatisticLine text = "Positive" val = {(props.good/((props.good+props.neutral+props.bad)))*100 +"%"}/>
    </div>
  )
}

// komponentti näyttää yhden tietyn tilastorivin (palauttaa yhden taulukkorivin)
const StatisticLine = (props) => {
  return (
    <table>
      <tr>
        <td>{props.text}:</td>
        <td>{props.val}</td>
      </tr>
    </table>
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

// komponentti hoitaa yhden painikkeen muutokset
const Button = (props) => {
  return (
    <button onClick = {() => props.state(props.type+1)}>{props.name}</button>
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
      <Button name = "good" type = {good} state = {setGood}/>
      <Button name = "neutral" type = {neutral} state = {setNeutral}/>
      <Button name = "bad" type = {bad} state = {setBad}/>
      <h1>Statistics</h1>
      <Render good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

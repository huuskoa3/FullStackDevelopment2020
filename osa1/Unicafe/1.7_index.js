import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick ={()=>setGood(good+1)}> good </button>
      <button onClick={()=>setNeutral(neutral+1)}> neutral </button>
      <button onClick={()=>setBad(bad+1)}> bad </button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good - bad}</p>
      <p>Average: {(good+neutral+bad)/3}</p>
      <p>Positive: {(good/((good+neutral+bad)))*100} %</p>
    </div>

  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

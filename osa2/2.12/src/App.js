import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const promise = axios.get('https://restcountries.eu/rest/v2/all')
console.log(promise)

const Filter = (props) => {
  console.log("filter run")
  return (
    <div>
      find countries: <input
      onChange={props.changeFunc}
      value={props.value}
      />
    </div>
  )
}

const Render = (props) => {
  console.log("render run")
  return (
    <div>
      {props.showFunction.map(country =>
        <p key = {country.name}> {country.name} </p>)}
    </div>
  )
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = showAll
      ? countries
      : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterAddition = (event) => {
    console.log(newFilter)
    setNewFilter(event.target.value)
  //  console.log(countries.filter(country => country.name.includes(newFilter) !== true))
      if(newFilter !== '') {
        setShowAll(countries.filter(country => country.name.includes(newFilter) !== true) > 0)
      } else {
        setShowAll(true)
      }

  }

  return (
    <div>
      <Filter changeFunc = {handleFilterAddition} value = {newFilter}/>
      <p> {console.log("GAP")} </p>
      <Render showFunction = {countriesToShow}/>
    </div>
  )

}

export default App;

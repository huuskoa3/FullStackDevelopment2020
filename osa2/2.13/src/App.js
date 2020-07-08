import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


//komponentti päivittää syötetekstin ja aktivoi tapahtumakäsittelijän
//handleFilterAddition kun syöte muuttuu
const Filter = ({changeFunc, value}) => {
  return (
    <div>
      find countries: <input
      onChange={changeFunc}
      value={value}
      />
    </div>
  )
}

// komponentti palauttaa yhden maan "country" tiedot
const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <div>
        <h1>Languages</h1>
        <ul>
        {country.languages.map(language =>
          <li key = {language.name}> {language.name} </li>)}
        </ul>
      </div>
      <img key = {country.name} src = {country.flag} width ="150px" alt = "img"></img>
    </div>
  )
}


// komponentti palauttaa maiden listan tai yhden maan tiedot
const Render = (props) => {
  const x = props.show

// funktio asettaa suodattimeen painikkeella valitun maan nimen
  const showOne = (country) => {
    props.setFilter(country.name)
  }

  if(x.length > 10 ){
    return (
      <p> Too many matches </p>
    )
  }
  else if(x.length <= 10 && x.length > 1) {
    return (
      <div>
        {x.map(country =>
          <p key = {country.name}>{country.name}
          <button onClick = {() => showOne(country)}>show</button>
          </p>)}
      </div>
    )
  }
  else if(x.length === 1) {
    return (
      <div>
        <Country country = {x[0]} />
      </div>
    )
  }else{
    return(
      <p> No matches </p>
    )
  }
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState([])

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
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter changeFunc = {handleFilterAddition} value = {newFilter}/>
      <Render show = {countriesToShow} setFilter = {setNewFilter}/>
    </div>
  )
}

export default App;

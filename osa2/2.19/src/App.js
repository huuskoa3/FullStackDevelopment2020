import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'
const baseURL = 'http://localhost:3001/persons'


// komponentti palauttaa syötteen joka suodattaa nimiä
const Filter = (props) => {
  return (
    <div>
      filter shown with: <input
      onChange={props.changeFunc}
      value={props.value}
      />
    </div>
  )
}

// komponentti palauttaa uuden nimen ja numeron lisäävät syötteet (input)
// ja lähetyspainikkeen (button)
const PersonForm = (props) => {
  return (
    <div>
    <form onSubmit={props.submit}>
      <div>
        name: <input
        value={props.valName}
        onChange={props.changeName}
        />
      </div>
      <div>
        number: <input
        value={props.valNumber}
        onChange={props.changeNumber}
        />
      </div>
    <div>
        <button type="submit">add</button>
    </div>
    </form>
    </div>
  )
}


// komponentti palauttaa näytettävien henkilöiden nimet ja numerot
// 2.17 map funktioon lisätty tapahtumakäsittelijän käyttö
const Persons = (props) => {
  return (
    <div>
      {props.showFunction.map(person =>
        <p key = {person.id}> {person.name} {person.number} <button onClick = {() => props.handleFunction(person)}> delete </button> </p>)}
    </div>

  )
}

// komponentti palauttaa tulosteen joka sisältää tapahtumaviestin
// muotoilulla ".message" 
const Message = ({message}) => {
  if(message === null) {
    return null
  }
  return (
    <div className= "message">
      <p>{message}</p>
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ newMessage, setNewMessage ] = useState(null)

// 2.16 lisätty viittaus personService moduuliin
  useEffect(() => {
    personService
      .getAll()
        .then(initalPersons => {
          setPersons(initalPersons)
      })
  }, [])

// metodi luo uuden olion personObject ja antaa lisää tämän persons listaan
// jonka lisäksi metodi palauttaa lisättävän henkilön nimen JA NUMERON tyhjiksi
// merkkijonoiksi
// 2.15 metodi lisää nimen myös serverille
// 2.16 lisätty viittaus personService moduuliin
// 2.19 metodiin lisätty tapahtumaviestin (newMessage) päivitys
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .modify(persons.find(n => n.name === newName), persons, newNumber)
            .then(modifiedPerson => {
              setPersons(persons.map(p => p.id !== modifiedPerson.id ? p : modifiedPerson))
              setNewName('')
              setNewNumber('')
            })
        setNewMessage(`Updated "${newName}"`)
      }
    } else {
    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setNewMessage(`Added "${newName}"`)
    }
  }

// 2.17 metodi toimii tapahtumakäsittelijänä henkilön poistamisessa
// 2.19 metodiin lisätty tapahtumaviestin (newMessage) päivitys
  const removePerson = (event) => {
    const id = event.id
    const result = window.confirm("Delete "+event.name+"?")
    if(result) {
    personService
      .deleteOne(id)
        .then(newPersons => {
          setPersons(persons.filter(x => x.id !== id))
        })
        setNewMessage(`Removed "${event.name}"`)

    }
  }

// metodi määrittää showAll tilan, ja näin näyttää henkilöt joiden nimessä
// esiintyy merkkijono newFilter
  const namesToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

// tapahtumakäsittelijä päivittää uuden lisäyksen setNewName tilaa
// näyttämällä tekstin syötteessä (input)
  const handlePersonAddition = (event) => {
      setNewName(event.target.value)
  }

// tapahtumakäsittelijä päivittää uuden lisäyksen setNewNumber tilaa
// näyttämällä tekstin syötteessä (input)
  const handlePersonNumberAddition = (event) => {
      setNewNumber(event.target.value)
  }

// tapahtumakäsittelijä päivittää uuden lisäyksen setNewFilter tilaa
// näyttämällä tekstin syötteessä (input)
  const handleFilterAddition = (event) => {
    setNewFilter(event.target.value)
    if(newFilter !== '') {
      setShowAll(persons.filter(person => person.name.includes(newFilter) !== true) > 0)
    } else {
      setShowAll(true)
    }
  }



// App käsittelee uuden henkilön lisäyksen addPerson ja handlePersonAddition
// metodien avulla. Tulostus tapahtuu map komennolla
// 2.10 toteutettu komponentit Filter, PersonForm ja Persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Message message = {newMessage}/>
      <Filter changeFunc = {handleFilterAddition} value = {newFilter}/>
      <h2>Add a new</h2>
      <PersonForm submit = {addPerson}
        valName = {newName} changeName = {handlePersonAddition}
        valNumber = {newNumber} changeNumber = {handlePersonNumberAddition}
      />
      <h2>Numbers</h2>
      <Persons showFunction = {namesToShow} handleFunction = {removePerson} />
    </div>
  )
}

export default App

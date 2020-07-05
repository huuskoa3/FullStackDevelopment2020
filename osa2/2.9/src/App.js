import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

// metodi luo uuden olion personObject ja antaa lisää tämän persons listaan
// jonka lisäksi metodi palauttaa lisättävän henkilön nimen JA NUMERON tyhjiksi
// merkkijonoiksi
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.filter(person => person.name === newName).length > 0) {
      return window.alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
  console.log(persons.filter(person => person.name.includes(newFilter) !== true))
  if(newFilter !== '') {
    setShowAll(persons.filter(person => person.name.includes(newFilter) !== true) > 0)
  } else {
    setShowAll(true)
  }
}


// App käsittelee uuden henkilön lisäyksen addPerson ja handlePersonAddition
// metodien avulla. Tulostus tapahtuu map komennolla
// 2.8 App komponenttiin lisätty numeroa kysyvä kenttä (number)
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
        onChange={handleFilterAddition}
        value={newFilter}

        />
      </div>
      <h2>add new</h2>
      <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handlePersonAddition}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handlePersonNumberAddition}
          />
        </div>
      <div>
          <button type="submit">add</button>
      </div>
      </form>
      </div>
      <h2>Numbers</h2>
        {namesToShow.map(person =>
        <p key = {person.name}> {person.name} {person.number}</p>)}
    </div>
  )

}

export default App

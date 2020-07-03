import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "123" }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

// App käsittelee uuden henkilön lisäyksen addPerson ja handlePersonAddition
// metodien avulla. Tulostus tapahtuu map komennolla
// 2.8 App komponenttiin lisätty numeroa kysyvä kenttä (number)
  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
        <p key = {person.name}> {person.name} {person.number}</p>)}
    </div>
  )

}

export default App

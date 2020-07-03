import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')


// metodi luo uuden olion personObject ja antaa lisää tämän persons listaan
// jonka lisäksi metodi palauttaa lisättävän henkilön nimen tyhjäksi
// merkkijonoksi
// 2.7 metodi ilmoittaa jos nimi löytyy jo listasta. Nimen löytyminen
// tarkastetaan filter komennolla, joka on 0 jos nimeä ei löydy ja >0 jos
// nimi löytyy
const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName
  }
  if(persons.filter(person => person.name === newName).length > 0) {
    return window.alert(`${newName} is already added to phonebook`)
  }

  setPersons(persons.concat(personObject))
  setNewName('')
}

// tapahtumakäsittelijä päivittää uuden lisäyksen setNewName tilaa
// näyttämällä tekstin syötteessä (input)
  const handlePersonAddition = (event) => {
      setNewName(event.target.value)
  }


// App käsittelee uuden henkilön lisäyksen addPerson ja handlePersonAddition
// metodien avulla. Tulostus tapahtuu map komennolla
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
          name: <input
          value={newName}
          onChange={handlePersonAddition}
          />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
        <p key = {person.name}> {person.name}</p>)}
    </div>
  )

}

export default App

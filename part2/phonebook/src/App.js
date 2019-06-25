import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  // First param = the effect itself
  // Second param, an empty array [] = the effect is only run along with the first render of the component
  useEffect(hook, []) 

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterPersons(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterPersons={filterPersons} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm persons={persons} 
        setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filterPersons={filterPersons} />
      
    </div>
  )
}

export default App
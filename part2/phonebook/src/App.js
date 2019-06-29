import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Person';
import personService from './services/persons' 
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }
  // First parameter = the effect itself
  // Second - an empty array [] = the effect is only run along with the first render of the component
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

      <Notification message={notificationMessage} type={notificationType} />

      <Filter filterPersons={filterPersons} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm persons={persons} 
        setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} 
        setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} setPersons={setPersons} filterPersons={filterPersons} />
      
    </div>
  )
}

export default App
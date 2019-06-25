import React from 'react';

const isDuplicate = (arr, name) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return true
        }
    }
    return false
}

const PersonForm = ({ persons, setPersons, setNewName, setNewNumber,
    newName, handleNameChange, newNumber, handleNumberChange }) => {

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }
        console.log(persons)
        if (isDuplicate(persons, newName)) {
            window.alert(`${newName} is already added to phonebook`);
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
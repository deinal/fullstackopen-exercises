import React from 'react';
import personService from './../services/persons'

const isDuplicate = (arr, name) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return arr[i].id
        }
    }
    return false
}

const PersonForm = ({ persons, setPersons, setNewName, setNewNumber,
    newName, handleNameChange, newNumber, handleNumberChange,
    setNotificationMessage, setNotificationType }) => {

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }

        const dupid = isDuplicate(persons, newName)
        if (dupid !== false) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(dupid, personObject)
                    .then(data => {
                        console.log(data)
                        setPersons(persons.map(person => person.id !== dupid ? person : data))
                        setNewName('')
                        setNewNumber('')
                        setNotificationType('notification')
                        setNotificationMessage(
                            `Updated ${data.name}`
                        )
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setNotificationType('error')
                        setNotificationMessage(
                            `Information of ${newName} has already been removed from server`
                        )
                        setPersons(persons.filter(p => p.id !== dupid))
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(data => {
                    console.log(data)
                    setPersons(persons.concat(data))
                    setNewName('')
                    setNewNumber('')
                    setNotificationType('notification')
                    setNotificationMessage(
                        `Added ${data.name}`
                    )
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotificationType('error')
                    console.log(error.response.data)
                    setNotificationMessage(`error: ${error.response.data.error}`)
                    setTimeout(() => {
                        setNotificationMessage(null)
                    }, 5000)
                })
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
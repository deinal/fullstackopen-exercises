import React from 'react';
import personService from './../services/persons'

const Persons = ({ persons, setPersons, filterPersons }) => {

    const isEmpty = (str) => str.length === 0

    const Person = ({ person }) => <p>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button></p>

    const removePerson = (personid) => {
        //event.preventDefault()
        // const str = event.target.value //why can't this be an array :(
        // const personid = Number(str.replace(/,.+/, '')) //regex to the rescue
        // const name = str.replace(/.+(?=,),/, '')
        const person = persons.find(p => p.id === personid)

        if (window.confirm(`Delete  ${person.name} ?`)) {
            personService
                .remove(personid)
                .then(data => {
                    console.log(data)
                    // const array = [...persons]
                    // array.splice(personid-1, 1)
                    // setPersons(array)
                    // filter is by far better:
                    setPersons(persons.filter(p => p.id !== personid))

                })
        }
    }

    const personsToShow = isEmpty(filterPersons)
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filterPersons.toLowerCase()))

    const rows = () => personsToShow.map(person =>
        <Person
            key={person.id}
            person={person}
        />
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons
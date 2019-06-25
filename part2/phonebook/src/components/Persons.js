import React from 'react';

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const isEmpty = (str) => str.length === 0

const Persons = ({ persons, filterPersons }) => {

    const personsToShow = isEmpty(filterPersons)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterPersons.toLowerCase()))

    const rows = () => personsToShow.map(person =>
        <Person
            key={person.name}
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
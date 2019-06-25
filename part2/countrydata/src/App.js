import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CountryLanguages = ({ country }) => {
  return (
    country.languages.map(language =>
      <li key={language.name}>{language.name}</li>
    )
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        <CountryLanguages country={country} />
      </ul>
      <img alt={country.name} style={{ width: '100px', height: '100px' }} src={country.flag} />
      <h3>Weather in {country.name}</h3>
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState('')

  const handleFilterChange = (event) => {
    setFilterCountries(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleClick = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilterCountries(event.target.value)
    rows()
  }

  const countriesToShow = filterCountries.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filterCountries.toLowerCase()))

  const rows = () => {
    if (countriesToShow.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    }
    else if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <Country
            key={country.name}
            country={country}
          />
        )
      )
    }
    else {
      return (
        countriesToShow.map(country =>
          <div key={country.name}>
            {country.name} <button value={country.name} onClick={handleClick}>show</button>
          </div>
        )
      )
    }
  }

  return (
    <div>
      <div>
        find countries <input value={filterCountries} onChange={handleFilterChange} />
      </div>
      <div>
        {rows()}
      </div>
    </div>
  )
}

export default App;

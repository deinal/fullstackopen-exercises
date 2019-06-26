import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryLanguages = ({ country }) => {
    return (
        country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
        )
    )
}

const Country = ({ country }) => {
    const [temp, setTemp] = useState([])
    const [weathericon, setWeathericon] = useState([])
    const [wind, setWind] = useState([])
    const [winddir, setWinddir] = useState([])

    const hook = () => {
        const link = "https://api.apixu.com/v1/current.json?key=5a8610feaba543edaee215827192506&q=" + country.capital
        console.log('effect')
        axios
            .get(link)
            .then(response => {
                console.log(response.data)
                console.log('promise fulfilled')
                setTemp(response.data.current.temp_c)
                setWeathericon(response.data.current.condition.icon)
                setWind(response.data.current.wind_kph)
                setWinddir(response.data.current.wind_dir)
            })
    }
    useEffect(hook, [])

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
            <h3>Weather in {country.capital}</h3>
            <p><b>temperature: </b>{temp} Celsius</p>
            <img alt={"weathericon"} style={{ width: '50px', height: '50px' }} src={weathericon} />
            <p><b>wind: </b>{wind} kph direction {winddir}</p>
        </div>
    )
}

export default Country
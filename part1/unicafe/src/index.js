import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ ratings }) => {
    const good = ratings[0]
    const neutral = ratings[1]
    const bad = ratings[2]
    const all = good + neutral + bad

    if (all === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    const average = (good - bad) / all
    const positive = 100 * good / all

    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={all} />
                <Statistic text="average" value={average} />
                <Statistic text="positive" value={positive + " %"} />
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header title={"give feedback"} />
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <Header title={"statistics"} />
            <Statistics ratings={[good, neutral, bad]} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
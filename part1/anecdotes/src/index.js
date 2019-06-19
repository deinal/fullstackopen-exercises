import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
    return <h1>{title}</h1>
}

const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
    const [favourite, setFavourite] = useState(0)

    const handleNextClick = () => {
        const random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    const handleVoteClick = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        let i = copy.indexOf(Math.max(...copy));
        setFavourite(i)
    }

    return (
        <div>
            <Header title={"Anecdote of the day"} />
            {props.anecdotes[selected]}<br />
            has {points[selected]} votes<br />
            <Button text={"vote"} onClick={handleVoteClick} />
            <Button text={"next anecdote"} onClick={handleNextClick} />
            <Header title={"Anecdote with most votes"} />
            {props.anecdotes[favourite]}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => parts.map((part) => {
    return <p>{part.name} {part.exercises}</p>
})

const DispTot = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Total = (parts) => parts.reduce((sum, part) => {
    return sum + part.exercises
}, 0)

/*const Total = (parts) => {
    let totalAmount = 0
    for (let i = 0; i < parts.length; i++) {
        totalAmount += parts[i].exercises
    }
    return totalAmount
}*/

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <DispTot sum={Total(course.parts)} />
        </div>
    )
}

export default Course;
import React from 'react'
import ReactDOM from 'react-dom'

// reduce menetelmää käytetty. reduce menetelmän kuuluu palauttaa olio, jolla
// ominaisuus exercises
const Course = ({course}) => {
  let sum = 0
  const total = course.parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))

  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(tag =>
      <p key = {tag.id}>
      {tag.name} {tag.exercises}</p>)}
    <b>total of {total.exercises} exercises</b>
    </div>
  )
}

export default Course

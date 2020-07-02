import React from 'react'
import ReactDOM from 'react-dom'


const Course = ({course}) => {
  let sum = 0
  course.parts.map((a) =>  sum = sum + a.exercises)

  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(tag =>
      <p key = {tag.id}>
      {tag.name} {tag.exercises}</p>)}
    <b>total of {sum} exercises</b>
    </div>
  )
}

export default Course

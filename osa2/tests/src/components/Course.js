import React from 'react'
import ReactDOM from 'react-dom'


const Course = ({course}) => {
  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(tag =>
    <p key = {tag.id}>{tag.name} {tag.exercises}</p>) }
    </div>
  )
}

export default Course

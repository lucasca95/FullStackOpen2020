import React from 'react';

const Total = ({ parts }) => {
    return(
      <p>
        <strong>
          Total of {parts.reduce((sum, part) => {
            return sum + part.exercises;
          }, 0)} exercises
        </strong>
      </p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part) => {
          return <Part key={part.id} part={part} />
        })}
      </div>
    )
  }

  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

export default Course;
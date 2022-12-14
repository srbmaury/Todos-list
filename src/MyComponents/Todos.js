import React from 'react'
import TodoItem from './TodoItem'

const Todos = (props) => {
  let myStyle = {
    minHeight: "36vh",
    margin: "40px auto",
  }
  let todosStyle = {
    display:"inline-flex",
    marginLeft:"-2.4vw"
  }
  return (
    <div className='container' style={myStyle}>
      <h3 className='my-3'>Todos List</h3>
      <div style={todosStyle} className='row'>
        {props.todos.length === 0 ? <p className='container mx-4'>No todos to display</p>:
          props.todos.map((todo, index) => {
            return <TodoItem todo={todo} onDelete={props.onDelete} onEdit={props.onEdit} key={index} />
          })}
      </div>
    </div>
  )
}

export default Todos

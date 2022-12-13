import React from 'react'
import TodoItem from './TodoItem'

const Todos = (props) => {
  let myStyle= {
    minHeight:"36vh",
    margin:"40px auto"
  }
  return (
    <div className='container' style={myStyle}>
      <h3 className='my-3'>Todos List</h3>
      {props.todos.length === 0 ? "No todos to display" :
      props.todos.map((todo, index)=>{
        return(
          <div key={index}>
            <TodoItem todo={todo} onDelete = {props.onDelete} />
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default Todos

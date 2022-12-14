import React, {useState, useEffect} from 'react'

const TodoItem = ({ todo, onDelete, onEdit, onCheck }) => {
  const myStyle = {
    width: "18rem",
  }
  const pstyle = {
    height: "90px"
  }
  const checkStyle = {
    zoom:"220%",
    float:"right"
  }

  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo]);
 
  return (
    <div className="card mx-4 my-3" style={myStyle} >
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{todo.date}</h6>
        <hr />
        <p style={pstyle} className="card-text">{todo.desc}</p>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo)}>Delete</button>
        <button className="btn btn-sm btn-secondary mx-3" onClick={() => onEdit(todo)}>Edit</button>
        <input style={checkStyle} type="checkbox" className='checkbox' checked={completed} onClick={() => onCheck(todo)} readOnly={true} />
      </div>
    </div>
  )
}

export default TodoItem

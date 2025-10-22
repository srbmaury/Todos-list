import React, { useState } from 'react';
import TodoItem from './TodoItem';

const Todos = (props) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const myStyle = {
    minHeight: "36vh",
    margin: "40px auto",
  };
  const todosStyle = {
    display: "inline-flex",
    marginLeft: "-2.4vw",
  };

  // ✅ Filter logic
  const filteredTodos = props.todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed === true;
    if (filter === 'pending') return todo.completed === false;
    return true;
  });

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>

      {/* ✅ Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'} mx-1`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'} mx-1`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      {/* ✅ Filtered Todos */}
      <div style={todosStyle} className="row">
        {filteredTodos.length === 0 ? (
          <p className="container mx-4">No todos to display</p>
        ) : (
          filteredTodos.map((todo, index) => (
            <TodoItem
              todo={todo}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              onCheck={props.onCheck}
              key={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Todos;

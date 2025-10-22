import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Todos = (props) => {
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage if available, else from props
  const [todosList, setTodosList] = useState(() => {
    const savedTodos = localStorage.getItem('todosList');
    return savedTodos ? JSON.parse(savedTodos) : props.todos;
  });

  // Update localStorage whenever todosList changes
  useEffect(() => {
    localStorage.setItem('todosList', JSON.stringify(todosList));
  }, [todosList]);

  const myStyle = {
    minHeight: "36vh",
    margin: "40px auto",
  };

  const todosStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  };

  const filteredTodos = todosList.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed === true;
    if (filter === 'pending') return todo.completed === false;
    return true;
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = todosList.findIndex(
      t => t.sno === filteredTodos[result.source.index].sno
    );
    const destIndex = todosList.findIndex(
      t => t.sno === filteredTodos[result.destination.index].sno
    );

    const items = Array.from(todosList);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destIndex, 0, moved);

    setTodosList(items); // This automatically updates localStorage via useEffect
  };

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>

      {/* Filter Buttons */}
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

      {/* Drag-and-Drop */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={todosStyle}
            >
              {filteredTodos.length === 0 ? (
                <p className="container mx-4">No todos to display</p>
              ) : (
                filteredTodos.map((todo, index) => (
                  <Draggable
                    key={todo.sno}
                    draggableId={todo.sno.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          todo={todo}
                          onDelete={props.onDelete}
                          onEdit={props.onEdit}
                          onCheck={props.onCheck}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todos;

import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TodoStats from './TodoStats';
import TodoSearch from './TodoSearch';

const Todos = ({ todos, onDelete, onEdit, onCheck, onReorder }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [searchTerm, setSearchTerm] = useState('');

  const myStyle = { minHeight: "36vh", margin: "40px auto" };
  const todosStyle = { display: "flex", flexWrap: "wrap", gap: "15px" };

  // Filter todos based on filter + search
  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'all') return true;
      if (filter === 'completed') return todo.completed;
      if (filter === 'pending') return !todo.completed;
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleOnDragEnd = (result) => {
    if (!result.destination || result.source.index === result.destination.index) return;

    // Reorder logic works with filteredTodos merged back into full todos
    const movedItem = filteredTodos[result.source.index];
    const newTodos = todos.filter(t => t.sno !== movedItem.sno);

    const targetIndex = result.destination.index >= filteredTodos.length
      ? newTodos.length
      : newTodos.findIndex(t => t.sno === filteredTodos[result.destination.index].sno);

    newTodos.splice(targetIndex, 0, movedItem);
    onReorder(newTodos);
  };

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>

      {/* Search + Filter */}
      <div style={{ marginBottom: "15px" }}>
        <TodoSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
          onClick={() => setFilter('all')}
        >All</button>

        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'} mx-1`}
          onClick={() => setFilter('completed')}
        >Completed</button>

        <button
          className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'} mx-1`}
          onClick={() => setFilter('pending')}
        >Pending</button>
      </div>

      <TodoStats todos={filteredTodos} />

      {/* Drag-and-Drop Todos */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={todosStyle}>
              {filteredTodos.length === 0 ? (
                <p className="container mx-4">No todos to display</p>
              ) : (
                filteredTodos.map((todo, index) => (
                  <Draggable key={todo.sno} draggableId={todo.sno.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TodoItem
                          todo={todo}
                          onDelete={onDelete}
                          onEdit={onEdit}
                          onCheck={onCheck}
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

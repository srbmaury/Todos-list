import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Todos = ({ todos, onDelete, onEdit, onCheck, onReorder }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const myStyle = { minHeight: "36vh", margin: "40px auto" };
  const todosStyle = { display: "flex", flexWrap: "wrap", gap: "15px" };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    // If we're in a filtered view, we need to handle this differently
    if (filter !== 'all') {
      // Get the item being moved
      const movedItem = filteredTodos[result.source.index];
      
      // Find the indices in the original todos array
      const originalSourceIndex = todos.findIndex(t => t.sno === movedItem.sno);
      
      // Create a copy of all todos
      const newTodos = Array.from(todos);
      
      // Remove the moved item from its original position
      newTodos.splice(originalSourceIndex, 1);
      
      // Find where to insert in the original array
      if (result.destination.index === 0) {
        // Moving to first position in filtered view
        const firstFilteredItem = filteredTodos[0];
        const firstOriginalIndex = todos.findIndex(t => t.sno === firstFilteredItem.sno);
        newTodos.splice(firstOriginalIndex, 0, movedItem);
      } else if (result.destination.index >= filteredTodos.length - 1) {
        // Moving to last position in filtered view
        const lastFilteredItem = filteredTodos[filteredTodos.length - 1];
        const lastOriginalIndex = todos.findIndex(t => t.sno === lastFilteredItem.sno);
        newTodos.splice(lastOriginalIndex + 1, 0, movedItem);
      } else {
        // Moving somewhere in the middle
        const targetFilteredItem = filteredTodos[result.destination.index];
        const targetOriginalIndex = newTodos.findIndex(t => t.sno === targetFilteredItem.sno);
        newTodos.splice(targetOriginalIndex, 0, movedItem);
      }
      
      onReorder(newTodos);
    } else {
      // Simple case: reordering all todos
      const newTodos = Array.from(todos);
      const [movedItem] = newTodos.splice(result.source.index, 1);
      newTodos.splice(result.destination.index, 0, movedItem);
      onReorder(newTodos);
    }
  };  

  return (
    <div className="container" style={myStyle}>
      <h3 className="my-3">Todos List</h3>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
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

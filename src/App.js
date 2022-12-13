import './App.css';
import Header from './MyComponents/Header';
import Home from './Home';
import { Footer } from './MyComponents/Footer';
import About from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  let initTodo;
  if (localStorage.getItem('todos') === null) {
    initTodo = []
  } else {
    initTodo = JSON.parse(localStorage.getItem('todos'));
  }
  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) sno = 1;
    else sno = todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);

  }
  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Router >
        <Header title="Todos List" searchBar={false} />
        <Routes>
          <Route path='/Todos-list/about' element={<About/>} />
          <Route path='/Todos-list' element={<Home addTodo={addTodo} todos={todos} onDelete={onDelete} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
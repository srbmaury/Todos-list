import './App.css';
import Header from './MyComponents/Header';
import Home from './MyComponents/Home';
import { Footer } from './MyComponents/Footer';
import About from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const onCheck = (todo) => {
    setTodos(todos.map((e) => {
      if(e === todo){
        return {
          sno:todo.sno,
          title:todo.title,
          desc:todo.desc,
          date:todo.date,
          completed:!todo.completed 
        }
      }
      return e;
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
      desc: desc,
      date: "Created on " + String(new Date()).substring(0,24),
      completed:false
    }
    setTodos([...todos, myTodo]);
  }
  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  const change = (todo, title, desc) => {
    setTodos(todos.map((e) => {
      if(e === todo && (todo.title !== title || todo.desc !== desc)){
        return {
          sno:todo.sno,
          title:title,
          desc:desc,
          date:"last edited on " + String(new Date()).substring(0,24),
          completed:todo.completed
        }
      }
      return e;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const onReorder = (reorderedTodos) => {
    setTodos(reorderedTodos);
  }
  return (
    <>
      <Router >
        <Header 
          title="Todos List" 
          searchBar={false}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Routes>
          <Route path='/Todos-list/about' element={<About/>} />
          <Route path='/Todos-list' element={<Home addTodo={addTodo} todos={todos} onDelete={onDelete} onCheck={onCheck} change={change} onReorder={onReorder} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

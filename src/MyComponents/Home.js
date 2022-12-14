import React, {useState} from 'react';
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'
import Todos from './Todos'

const Home = (props) => {
    const [editTodo, setEditTodo] = useState(false);
    const [todo, setTodo] = useState({});

    const onEdit = (todo) => {
        setEditTodo(true);
        document.body.style.overflowY = "hidden";
        setTodo(todo);
    }

    const close  = () => {
        document.body.style.overflowY = "visible";
        setEditTodo(false);
    }

    return (
        <>
            <EditTodo editTodo = {editTodo} close = {close} todo={todo} todos={props.todos} change={props.change} />
            <AddTodo addTodo={props.addTodo} />
            <Todos todos={props.todos} onDelete={props.onDelete} onEdit = {onEdit} onCheck={props.onCheck} />
        </>
    )
}

export default Home

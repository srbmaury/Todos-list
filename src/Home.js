import React from 'react'
import AddTodo from './MyComponents/AddTodo'
import Todos from './MyComponents/Todos'

const Home = (props) => {
    return (
        <>
            <AddTodo addTodo={props.addTodo} />
            <Todos todos={props.todos} onDelete={props.onDelete} />
        </>
    )
}

export default Home

import React, {useState, useEffect} from 'react';

const EditTodo = (props) => {

    const myStyle = {
        position: "fixed",
        width: "40vw",
        height: "280px",
        marginTop: "10vh",
        marginLeft: "30vw",
        borderRadius: "10px",
        backgroundColor: "skyBlue",
        zIndex:1000
    }
       
    const [title, setTitle] = useState({...props.todo.title});
    const [desc, setDesc] = useState({...props.todo.desc});

    useEffect(() => {
        setTitle(props.todo.title);
    }, [props.todo.title]);
    
    useEffect(() => {
      setDesc(props.todo.desc);
    }, [props.todo.desc]);
    
    const submit = (e) =>{
        e.preventDefault();
        if(!title || !desc){
            alert("Title or Description can not be blank")
        }else{
            props.change(props.todo, title, desc);
            props.close();
        }
    }

    return (
        <>
            {props.editTodo &&
                <div style={myStyle}>
                    <button onClick={props.close} type="button" id="close" className="my-3 mx-3 btn-close" aria-label="Close"></button>
                    <form onSubmit={submit}>
                        <div className="mb-3 mx-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                        </div>
                        <div className="mb-3 mx-3">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <input type="text"className="form-control" id="desc" value={desc} onChange={(e)=>{setDesc(e.target.value)}} />
                        </div>

                        <button type="submit" id="submit" className="btn btn-sm btn-success mx-3" >Change</button>
                    </form>
                </div>
            }
        </>
    )
};

export default EditTodo;

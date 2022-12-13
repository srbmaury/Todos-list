import React, {useState} from 'react';

const AddTodo = ({addTodo}) => {
    const [title, setTtile] = useState("");
    const [desc, setDesc] = useState("");
    const submit = (e) =>{
        e.preventDefault();
        if(!title || !desc){
            alert("Title or Description can not be blank")
        }else{
            addTodo(title, desc);
            setTtile("");
            setDesc("");
        }
    }
    return (
        <div className="container">
            <h3 className='my-3'>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Ttile</label>
                    <input type="text" value={title} onChange={(e)=>{setTtile(e.target.value)}}className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="des" className="form-label">Description</label>
                    <input type="text" value= {desc} onChange={(e)=>{setDesc(e.target.value)}}className="form-control" id="desc" />
                </div>

                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo

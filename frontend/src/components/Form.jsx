import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addTodo, updateTodo } from '../features/todo/todoSlice'


const Form = () => {

    
     
    const [title , setTitle] = useState("")
    
    const [description , setDescription] = useState("")

    const {edit} = useSelector((state) => state.todos)
    

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        edit.isEdit ? dispatch(updateTodo({_id : edit.todo._id , title , description})): dispatch(addTodo({title,description}));
        setTitle("")
        setDescription("")
    }

    useEffect(() => {
       setTitle(edit.todo.title)
       setDescription(edit.todo.description)
    },[edit])


  return (
    <div className="container my-5">
        <h1 className='text-center '>CRUD</h1>
        <div className="card p-5 my-2 shadow">
            <form onSubmit={handleSubmit}>
                <input type="text" 
                className="form-control rounded-0" 
                placeholder='Enter Title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder='Enter Description'
                className="form-control rounded-0 my-2"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
                <button className='btn btn-success w-100 rounded-0'>Submit</button>
                
            </form>
        </div>
    </div>
  )
}

export default Form

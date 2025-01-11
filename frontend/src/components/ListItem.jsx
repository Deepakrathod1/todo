import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, edit, removeTodo } from '../features/todo/todoSlice'

const ListItem = ({todo}) => {
    const dispatch = useDispatch()

    const {isSuccess} = useSelector((state) => state.todos)

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
        if(isSuccess){
          dispatch(removeTodo(id))
        }
    } 

    const handleEdit = (todo) => {
        dispatch(edit(todo))
    }

  return (
    <li className="list-group-item p-3">
        <h2>Title : {todo.title}</h2>
        <p>Description : {todo.description}</p>
        <span className='float-end'>
            <button onClick={() => handleEdit(todo)} className='btn btn-primary btn-sm rounded-0'>Edit</button>
            <button onClick={() => handleDelete(todo._id)} className='btn btn-danger btn-sm rounded-0 mx-2'>Delete</button>
        </span>
    </li>
  )
}

export default ListItem

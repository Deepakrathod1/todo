import React, { useEffect } from 'react'
import ListItem from './ListItem'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { getTodos } from '../features/todo/todoSlice'


const ListGroup = () => {

    const {allTodos , isLoading ,isError} = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getTodos())
    },[])
 
    
    if(isError){
        return(
            <h1 className='text-center text-danger my-5'>Something Went Wrong...</h1>
        )
    }

    
    if(isLoading){
        return <Loading/>
    }

    if(allTodos.length === 0){
        return(
            <h1 className='text-center my-5 text-secondary '>No Todos Yet ...</h1>
        )
    }

  return (
    <div className="container my-5">
        <ul className="list-group shadow ">
        {
            allTodos.map(todo => <ListItem key={todo._id} todo={todo}/>)
        }
    </ul>
    </div>
  )
}

export default ListGroup

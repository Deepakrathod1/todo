import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Form from './components/Form'
import ListGroup from './components/ListGroup'

const App = () => {
  return (
    <>
    <Navbar/>
    <Form/>
    <ListGroup/>
    <ToastContainer/>
    </>
  )
}

export default App

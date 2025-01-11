import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const todoSlice = createSlice({
    name : "Todos",
    initialState : {
        allTodos : [],
        edit : { todo : {}, isEdit: false},
        isLoading : false,
        isSuccess : false,
        isError : false,
        message : "",
    },
    reducers : {
        removeTodo : (state , action) => {
            return{
                ...state,
                allTodos : state.allTodos.filter(item => item._id !== action.payload)
            }
        },
        edit : (state , action) => {
            return {
                ...state,
                edit : {todo : action.payload , isEdit : true }
            }
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getTodos.pending,(state,action)=> {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(getTodos.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allTodos = action.payload
        })
        .addCase(getTodos.rejected,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(addTodo.pending,(state,action)=> {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(addTodo.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allTodos = [...state.allTodos, action.payload]
        })
        .addCase(addTodo.rejected,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteTodo.pending,(state,action)=> {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(deleteTodo.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(deleteTodo.rejected,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
        })
        .addCase(updateTodo.pending,(state,action)=> {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        })
        .addCase(updateTodo.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.allTodos = state.allTodos.map(item => item._id === action.payload._id ? action.payload : item)
            state.edit = {todo : {} , isEdit : false}
        })
        .addCase(updateTodo.rejected,(state,action)=> {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
        })
    }
})

export const {removeTodo , edit} = todoSlice.actions
export default todoSlice.reducer

// Get Todo
export const getTodos = createAsyncThunk('FETCH/TODOS' , async() => {
    const response = await axios.get("/api/todo/")
    return response.data
}) 

// Create Todo
export const addTodo = createAsyncThunk("ADD/TODO" , async(formData) => {
    const response = await axios.post("/api/todo/" ,formData)
    return response.data
})

// Delete Todo
export const deleteTodo = createAsyncThunk("DELETE/TODO" , async(id) => {
    const response = await axios.delete("/api/todo/" + id)
    return response.data
})

// Update Todo
export const updateTodo = createAsyncThunk("UPDATE/TODO" , async(updatedTodo) => {
    const response = await axios.put("/api/todo/" + updatedTodo._id , updatedTodo)
    return response.data
})
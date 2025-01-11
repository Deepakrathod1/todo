const expressAsyncHandler = require("express-async-handler");
const Todo = require("../model/todoModel");

const getTodos = expressAsyncHandler(async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    res.status(404);
    throw new Error("Todo Not Found");
  }
  res.status(200).json(todos);
});

const addTodos = expressAsyncHandler(async (req, res) => {
  const { title, description, isPublished } = req.body;
  if (!title || !description) {
    res.status(401);
    throw new Error("Pleasde Fill All Details");
  }

  const newTodo = await Todo.create({
    title,
    description,
    isPublished,
  });
  if (!newTodo) {
    res.status(401);
    throw new Error("Unable To Create todo");
  }
  res.status(201).json(newTodo);
});

const getTodo = expressAsyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error("Todo Not Found");
  }
  res.status(200).json(todo);
});

const updateTodo = expressAsyncHandler(async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedTodo) {
    res.status(401);
    throw new Error("Todo Not Updated");
  }
  res.status(200).json(updatedTodo);
});

const removeTodo = expressAsyncHandler(async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
  });
});

module.exports = { getTodos, addTodos, getTodo, updateTodo, removeTodo };

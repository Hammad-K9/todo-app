const todosRouter = require('express').Router();
const Todo = require('../models/Todo');
const middleware = require('../utils/middleware');

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

todosRouter.post('/', async (req, res) => {
  const { body } = req;

  const todo = new Todo({ ...body });

  const savedTodo = await todo.save();
  res.status(201).json(savedTodo);
});

todosRouter.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

todosRouter.put('/:id', async (req, res) => {
  const todo = { ...req.body };

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, todo, {
    new: true
  });
  res.json(updatedTodo);
});

module.exports = todosRouter;

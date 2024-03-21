const todosRouter = require('express').Router();
const Todo = require('../models/Todo');

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

module.exports = todosRouter;

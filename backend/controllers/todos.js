const todosRouter = require('express').Router();
const Project = require('../models/Project');
const Todo = require('../models/Todo');
const middleware = require('../utils/middleware');

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

todosRouter.post('/', async (req, res) => {
  const { projectId, ...body } = req.body;

  const project = await Project.findById(projectId);
  const todo = new Todo({ ...body });

  const savedTodo = await todo.save();
  project.todos = [...project.todos, savedTodo._id];
  await project.save();
  if (project.name !== 'Inbox') {
    const inbox = await Project.findOne({ name: 'Inbox' });
    inbox.todos = [...inbox.todos, savedTodo._id];
    await inbox.save();
  }
  res.status(201).json(savedTodo);
});

todosRouter.delete('/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  const projects = await Project.find({});
  projects.map(async (p) => {
    p.todos = p.todos.filter((t) => t._id.toString() !== todo._id.toString());
    await p.save();
  });
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

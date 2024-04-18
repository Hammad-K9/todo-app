const { parseISO, format, isToday, isThisWeek, getDay } = require('date-fns');
const todosRouter = require('express').Router();
const Project = require('../models/Project');
const Todo = require('../models/Todo');

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

todosRouter.post('/', async (req, res) => {
  const { projectId, ...body } = req.body;

  const project = await Project.findById(projectId);

  body.date = body.date ? format(parseISO(body.date), 'MM/dd/yyyy') : '';
  const todo = new Todo({ ...body });
  const savedTodo = await todo.save();
  project.todos = [...project.todos, savedTodo._id];
  await project.save();

  let updatedProjectIds = [project._id];

  if (project.name !== 'Inbox') {
    const inbox = await Project.findOne({ name: 'Inbox' });
    inbox.todos = [...inbox.todos, savedTodo._id];
    await inbox.save();
    updatedProjectIds = [...updatedProjectIds, inbox._id];
  }

  if (isToday(savedTodo.date)) {
    const today = await Project.findOne({ name: 'Today' });
    today.todos = [...today.todos, savedTodo._id];
    await today.save();
    updatedProjectIds = [...updatedProjectIds, today._id];
  } else if (isThisWeek(savedTodo.date, { weekStartsOn: getDay(new Date()) })) {
    const thisWeek = await Project.findOne({ name: 'This Week' });
    thisWeek.todos = [...thisWeek.todos, savedTodo._id];
    await thisWeek.save();
    updatedProjectIds = [...updatedProjectIds, thisWeek._id];
  }

  const updatedProjects = await Project.find({
    _id: { $in: updatedProjectIds }
  }).populate('todos', {});
  res.status(201).json({ updatedProjects, savedTodo });
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

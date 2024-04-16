const projectsRouter = require('express').Router();
const Project = require('../models/Project');

projectsRouter.get('/', async (req, res) => {
  const projects = await Project.find({}).populate('todos', {});
  res.json(projects);
});

projectsRouter.post('/', async (req, res) => {
  const { body } = req;

  const project = new Project({ ...body });

  const savedProject = await project.save();
  res.status(201).json(savedProject);
});

projectsRouter.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = projectsRouter;

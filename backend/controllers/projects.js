const projectsRouter = require('express').Router();
const Project = require('../models/Project');

projectsRouter.get('/', async (req, res) => {
  const projects = await Project.find({}).populate('todos', { name: 1 });
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

projectsRouter.put('/:id', async (req, res) => {
  const project = { ...req.body };

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    project,
    {
      new: true
    }
  );
  res.json(updatedProject);
});

module.exports = projectsRouter;

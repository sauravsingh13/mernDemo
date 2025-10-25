import { Router } from 'express';
import { auth, AuthedRequest } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const r = Router();
r.use(auth);

r.get('/', async (req: AuthedRequest, res) => {
  const projects = await Project.find({ owner: req.user!.id }).sort({ createdAt: -1 });
  res.json(projects);
});

r.post('/', async (req: AuthedRequest, res) => {
  const p = await Project.create({ name: req.body.name, owner: req.user!.id, members: [req.user!.id] });
  res.json(p);
});

r.get('/:id/tasks', async (req: AuthedRequest, res) => {
  const tasks = await Task.find({ project: req.params.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

r.post('/:id/tasks', async (req: AuthedRequest, res) => {
  const t = await Task.create({ project: req.params.id, title: req.body.title, status: 'todo' });
  (req.app as any).get('io').to(`project:${req.params.id}`).emit('task.created', t);
  res.json(t);
});

r.patch('/tasks/:taskId', async (req: AuthedRequest, res) => {
  const t = await Task.findByIdAndUpdate(req.params.taskId, { status: req.body.status }, { new: true });
  if (t) (req.app as any).get('io').to(`project:${(t as any).project}`).emit('task.updated', t);
  res.json(t);
});

export default r;

import Problem from '../models/Problem.js';

export const listMyProblems = async (req, res) => {
  const items = await Problem.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
};

export const createProblem = async (req, res) => {
  const { title, topics = [], difficulty = 'Easy', code = '', language = 'javascript' } = req.body || {};
  if (!title) return res.status(400).json({ error: 'Title required' });
  const item = await Problem.create({ user: req.user.id, title, topics, difficulty, code, language });
  res.status(201).json(item);
};

export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const item = await Problem.findById(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (item.user.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  const updates = req.body || {};
  Object.assign(item, updates);
  await item.save();
  res.json(item);
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  const item = await Problem.findById(id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (item.user.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await item.remove();
  res.json({ success: true });
};

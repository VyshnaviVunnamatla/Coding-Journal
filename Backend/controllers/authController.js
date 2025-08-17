import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already registered' });
    const user = await User.create({ name, email, password });
    return res.status(201).json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await user.matchPassword(password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    return res.json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

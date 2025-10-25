import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const r = Router();

r.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) return res.status(400).json({ error: 'Missing fields' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, password: hash });
  res.json({ id: user._id, email: user.email, name: user.name });
});

r.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, (user as any).password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  res.cookie(process.env.COOKIE_NAME || 'sav_token', token, { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
});

r.post('/logout', (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'sav_token');
  res.json({ ok: true });
});

export default r;

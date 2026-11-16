import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(admin) {
  return jwt.sign({ sub: String(admin._id), email: admin.email }, env.jwtSecret, {
    expiresIn: '12h',
  });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    req.admin = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

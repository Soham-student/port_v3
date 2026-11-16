import { ZodError } from 'zod';
import { env } from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ error: 'Not found' });
}

// Express 5 forwards rejected promises from async handlers here.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Please check the highlighted fields',
      fields: Object.fromEntries(err.issues.map((i) => [i.path.join('.') || '_', i.message])),
    });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'That value is already in use' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON body' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request is too large' });
  }
  // Any other client-side error raised by middleware (e.g. unsupported charset).
  const status = err.status ?? err.statusCode;
  if (status >= 400 && status < 500) {
    return res.status(status).json({ error: 'Bad request' });
  }
  console.error(err);
  res.status(500).json({ error: env.isProd ? 'Something went wrong' : err.message });
}

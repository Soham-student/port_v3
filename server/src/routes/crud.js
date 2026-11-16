import { Router } from 'express';
import mongoose from 'mongoose';

const sort = { order: 1, createdAt: 1 };

function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  next();
}

/** Public, read-only list router. */
export function listRouter(Model) {
  const r = Router();
  r.get('/', async (req, res) => {
    res.json(await Model.find().sort(sort).lean());
  });
  return r;
}

/** Admin create / update / delete router. Mount behind requireAdmin. */
export function writeRouter(Model, schema, prepare = async (d) => d) {
  const r = Router();

  r.post('/', async (req, res) => {
    const doc = await Model.create(await prepare(schema.parse(req.body)));
    res.status(201).json(doc);
  });

  r.put('/:id', checkId, async (req, res) => {
    const data = await prepare(schema.parse(req.body), req.params.id);
    const doc = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  });

  r.delete('/:id', checkId, async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });

  return r;
}

export { checkId };

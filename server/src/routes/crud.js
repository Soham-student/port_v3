import { Router } from 'express';
import mongoose from 'mongoose';
import * as seedData from '../../src/data/seedData.js';

const sort = { order: 1, createdAt: 1 };

function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  next();
}

/** Public, read-only list router with fallback to seedData if DB offline */
export function listRouter(Model) {
  const r = Router();
  r.get('/', async (req, res) => {
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('DB offline');
      }
      const docs = await Model.find().sort(sort).lean();
      res.json(docs);
    } catch {
      const modelName = Model.modelName.toLowerCase();
      let data = [];
      if (modelName.includes('project')) data = seedData.projects;
      else if (modelName.includes('skill')) data = seedData.skills;
      else if (modelName.includes('experience')) data = seedData.experience;

      const withIds = (list, tag) =>
        [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((d, i) => ({ _id: `${tag}${i}`, ...d }));

      if (modelName.includes('project')) res.json(withIds(data, 'p'));
      else if (modelName.includes('skill')) res.json(withIds(data, 's'));
      else if (modelName.includes('experience')) res.json(withIds(data, 'e'));
      else res.json(data);
    }
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

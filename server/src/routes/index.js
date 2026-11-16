import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { Admin, Experience, Message, Project, SkillGroup } from '../models/index.js';
import { requireAdmin, signToken } from '../middleware/auth.js';
import { checkId, listRouter, writeRouter } from './crud.js';
import { slugify, uniqueSlug } from '../utils/slug.js';
import {
  contactSchema,
  experienceSchema,
  loginSchema,
  projectSchema,
  skillSchema,
} from './schemas.js';

const router = Router();

const limiter = (windowMs, limit, error, extra = {}) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error },
    ...extra,
  });

// Contact: 5 sent messages per hour per IP. Rejected submissions (typos, validation errors)
// don't use up a real person's allowance.
const contactLimiter = limiter(60 * 60 * 1000, 5, 'Too many messages. Please try again later.', {
  skipFailedRequests: true,
});
// Login: only failed attempts count towards the limit.
const loginLimiter = limiter(15 * 60 * 1000, 10, 'Too many login attempts. Try again later.', {
  skipSuccessfulRequests: true,
});

// A hash to compare against when the email is unknown, so response time does not leak
// which emails exist.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

router.get('/health', (req, res) => res.json({ ok: true }));

/* ---------- Public ---------- */
const projectsPublic = listRouter(Project);
projectsPublic.get('/:slug', async (req, res) => {
  if (!/^[a-z0-9-]{1,60}$/.test(req.params.slug)) return res.status(404).json({ error: 'Not found' });
  const doc = await Project.findOne({ slug: req.params.slug }).lean();
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});
router.use('/projects', projectsPublic);
router.use('/experience', listRouter(Experience));
router.use('/skills', listRouter(SkillGroup));

router.post('/contact', contactLimiter, async (req, res) => {
  const data = contactSchema.parse(req.body);
  // Honeypot filled in: pretend success, store nothing.
  if (data.website) return res.status(201).json({ ok: true });
  await Message.create({ name: data.name, email: data.email, message: data.message });
  res.status(201).json({ ok: true });
});

/* ---------- Auth ---------- */
router.post('/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const admin = await Admin.findOne({ email });
  const ok = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !ok) return res.status(401).json({ error: 'Incorrect email or password' });
  res.json({ token: signToken(admin), email: admin.email });
});

router.get('/auth/me', requireAdmin, (req, res) => {
  res.json({ email: req.admin.email });
});

/* ---------- Admin ---------- */
const admin = Router();
admin.use(requireAdmin);

// Every project needs a unique slug: use the one given, or derive it from the title.
const withSlug = async (data, id) => ({
  ...data,
  slug: await uniqueSlug(Project, data.slug || slugify(data.title), id),
});
admin.use('/projects', writeRouter(Project, projectSchema, withSlug));
admin.use('/experience', writeRouter(Experience, experienceSchema));
admin.use('/skills', writeRouter(SkillGroup, skillSchema));

admin.get('/messages', async (req, res) => {
  res.json(await Message.find().sort({ createdAt: -1 }).limit(500).lean());
});

admin.patch('/messages/:id', checkId, async (req, res) => {
  const read = req.body?.read === true;
  const doc = await Message.findByIdAndUpdate(req.params.id, { read }, { new: true });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

admin.delete('/messages/:id', checkId, async (req, res) => {
  const doc = await Message.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

router.use('/admin', admin);

export default router;

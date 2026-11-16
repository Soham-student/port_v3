import { z } from 'zod';

const str = (max) => z.string().trim().min(1, 'Required').max(max, `Max ${max} characters`);

// Only http(s) links are allowed, since the value is rendered as an <a href>.
const httpUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === '' || /^https?:\/\//i.test(v), 'Must start with http:// or https://')
  .default('');

const list = (maxItems, maxLen) =>
  z
    .array(z.string().trim().min(1).max(maxLen))
    .max(maxItems)
    .default([]);

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .max(60)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and dashes only')
  .or(z.literal(''))
  .default('');

// https:// link, or a site path like /images/orbit.jpg (not protocol-relative //).
const imageUrl = z
  .string()
  .trim()
  .max(300)
  .refine(
    (v) => v === '' || /^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v),
    'Use an https:// link or a path starting with /'
  )
  .default('');

const longText = z.string().trim().max(2500).default('');

export const projectSchema = z.object({
  title: str(80),
  slug,
  description: str(400),
  role: z.string().trim().max(60).default('Full-stack developer'),
  tags: list(8, 30),
  year: z.coerce.number().int().min(2000).max(2100),
  featured: z.boolean().default(false),
  image: imageUrl,
  overview: longText,
  challenge: longText,
  approach: longText,
  url: httpUrl,
  repo: httpUrl,
  order: z.coerce.number().int().default(0),
});

export const experienceSchema = z.object({
  period: str(40),
  title: str(100),
  org: str(60),
  description: str(600),
  order: z.coerce.number().int().default(0),
});

export const skillSchema = z.object({
  title: str(40),
  items: list(12, 40),
  order: z.coerce.number().int().default(0),
});

export const contactSchema = z.object({
  name: str(100),
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(200),
  message: z.string().trim().min(10, 'Tell me a little more (10+ characters)').max(4000),
  // Honeypot: real users never see or fill this. Accept any value here so the route can
  // quietly discard the submission instead of telling a bot it was caught.
  website: z.string().max(500).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200),
});

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const opts = { timestamps: true, versionKey: false };

export const Project = model(
  'Project',
  new Schema(
    {
      title: { type: String, required: true, trim: true, maxlength: 80 },
      slug: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
      description: { type: String, required: true, trim: true, maxlength: 400 },
      role: { type: String, trim: true, maxlength: 60, default: 'Full-stack developer' },
      tags: { type: [String], default: [] },
      year: { type: Number, required: true },
      featured: { type: Boolean, default: false },
      image: { type: String, trim: true, default: '' },
      overview: { type: String, trim: true, maxlength: 2500, default: '' },
      challenge: { type: String, trim: true, maxlength: 2500, default: '' },
      approach: { type: String, trim: true, maxlength: 2500, default: '' },
      url: { type: String, trim: true, default: '' },
      repo: { type: String, trim: true, default: '' },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const Experience = model(
  'Experience',
  new Schema(
    {
      period: { type: String, required: true, trim: true, maxlength: 40 },
      title: { type: String, required: true, trim: true, maxlength: 100 },
      org: { type: String, required: true, trim: true, maxlength: 60 },
      description: { type: String, required: true, trim: true, maxlength: 600 },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const SkillGroup = model(
  'SkillGroup',
  new Schema(
    {
      title: { type: String, required: true, trim: true, maxlength: 40 },
      items: { type: [String], default: [] },
      order: { type: Number, default: 0 },
    },
    opts
  )
);

export const Message = model(
  'Message',
  new Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 100 },
      email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
      message: { type: String, required: true, trim: true, maxlength: 4000 },
      read: { type: Boolean, default: false },
    },
    opts
  )
);

export const Admin = model(
  'Admin',
  new Schema(
    {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
    },
    opts
  )
);

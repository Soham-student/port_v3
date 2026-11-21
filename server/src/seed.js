import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { Admin, Experience, Project, SkillGroup } from "./models/index.js";
import * as seedData from "../../src/data/seedData.js";
import { slugify, uniqueSlug } from "./utils/slug.js";

/**
 * Inserts starter content into any EMPTY collection (or all of them with reset: true)
 * and makes sure the admin account from the environment exists.
 * With syncAdmin: true the admin password is overwritten from ADMIN_PASSWORD.
 */
export async function ensureSeed({ reset = false, syncAdmin = false } = {}) {
  const sets = [
    [Project, seedData.projects],
    [SkillGroup, seedData.skills],
    [Experience, seedData.experience],
  ];

  for (const [Model, docs] of sets) {
    if (reset) await Model.deleteMany({});
    if ((await Model.countDocuments()) === 0) {
      await Model.insertMany(docs);
      console.log(`Seeded ${docs.length} ${Model.modelName} documents`);
    }
  }

  // Projects saved before slugs existed get one so their case-study page works.
  for (const p of await Project.find({
    $or: [{ slug: { $exists: false } }, { slug: "" }],
  })) {
    p.slug = await uniqueSlug(Project, slugify(p.title), p._id);
    await p.save();
  }

  if (!env.adminEmail || !env.adminPassword) {
    console.warn(
      "ADMIN_EMAIL / ADMIN_PASSWORD not set: no admin account was created.",
    );
    return;
  }
  if (typeof env.adminPassword !== "string" || env.adminPassword.length < 10) {
    console.warn(
      "ADMIN_PASSWORD is shorter than 10 characters: admin account not created.",
    );
    return;
  }

  const existing = await Admin.findOne({ email: env.adminEmail });
  const passwordHash = await bcrypt.hash(env.adminPassword, 12);
  if (!existing) {
    await Admin.create({ email: env.adminEmail, passwordHash });
    console.log(`Created admin account ${env.adminEmail}`);
  } else if (syncAdmin) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Updated admin password for ${env.adminEmail}`);
  }
}

// CLI: `npm run seed` or `npm run seed:reset`
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const reset = process.argv.includes("--reset");
  try {
    await connectDB();
    await ensureSeed({ reset, syncAdmin: true });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

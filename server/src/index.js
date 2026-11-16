import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import { ensureSeed } from './seed.js';

try {
  await connectDB();
  await ensureSeed();
  createApp().listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
} catch (err) {
  console.error('Failed to start:', err.message);
  process.exit(1);
}

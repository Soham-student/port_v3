import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import { ensureSeed } from './seed.js';

try {
  await connectDB().catch(err => console.warn('MongoDB connection note (using fallback):', err.message));
  await ensureSeed().catch(err => console.warn('Seed note:', err.message));
  const app = await createApp();
  app.listen(env.port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${env.port}`);
  });
} catch (err) {
  console.error('Failed to start:', err.message);
  process.exit(1);
}

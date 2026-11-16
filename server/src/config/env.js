import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

export const env = {
  isProd,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio',
  jwtSecret: process.env.JWT_SECRET,
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD,
};

if (!env.jwtSecret || env.jwtSecret === 'change-me' || env.jwtSecret.length < 16) {
  console.error(
    'JWT_SECRET is missing or too weak. Set a long random value in .env (see .env.example).'
  );
  process.exit(1);
}

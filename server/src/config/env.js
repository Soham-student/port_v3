import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

export const env = {
  isProd,
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio',
  jwtSecret: process.env.JWT_SECRET || 'default-dev-jwt-secret-key-change-in-production-123456',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD,
};

if (!process.env.JWT_SECRET) {
  console.warn(
    '[AI Studio] JWT_SECRET not set in environment. Using default dev secret.'
  );
}

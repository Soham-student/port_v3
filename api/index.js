import mongoose from "mongoose";
import { connectDB } from "../server/src/config/db.js";
import { ensureSeed } from "../server/src/seed.js";
import { createApp } from "../server/src/app.js";

let appPromise;
let databasePromise;

async function getApp() {
  appPromise ||= createApp();
  return appPromise;
}

async function initializeDatabase() {
  if (mongoose.connection.readyState === 1) return;

  databasePromise ||= connectDB()
    .then(() => ensureSeed())
    .catch((error) => {
      databasePromise = undefined;
      throw error;
    });

  await databasePromise;
}

export default async function handler(req, res) {
  try {
    const app = await getApp();

    if (mongoose.connection.readyState !== 1) {
      await initializeDatabase();
    }

    return app(req, res);
  } catch (error) {
    console.error("Serverless API database error:", error);
    return res.status(503).json({
      error: "Database is unavailable. Configure MONGO_URI in Vercel and redeploy.",
    });
  }
}

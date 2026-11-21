import mongoose from "mongoose";
import { connectDB } from "../server/src/config/db.js";
import { ensureSeed } from "../server/src/seed.js";
import { createApp } from "../server/src/app.js";

let appPromise;

async function getApp() {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
    await ensureSeed();
  }
  appPromise ||= createApp();
  return appPromise;
}

export default async function handler(req, res) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not connect to the database." });
  }
}

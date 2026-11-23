import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { spawnSync } from "node:child_process";

const root = path.resolve(process.cwd());
const envPath = path.join(root, ".env");
dotenv.config({ path: envPath });

const mongoUri = process.env.MONGO_URI;
if (!mongoUri?.startsWith("mongodb+srv://")) {
  throw new Error("MONGO_URI must be an Atlas mongodb+srv URI");
}

const makePassword = (bytes = 24) =>
  crypto.randomBytes(bytes).toString("base64url");
const newAdminPassword = makePassword();
const jwtSecret = makePassword(32);
const adminEmail = (process.env.ADMIN_EMAIL || "soham4196@gmail .com")
  .trim()
  .toLowerCase();

const portfolioClient = new MongoClient(mongoUri);
await portfolioClient.connect();

const passwordHash = await bcrypt.hash(newAdminPassword, 12);
const adminResult = await portfolioClient
  .db("portfolio")
  .collection("admins")
  .updateOne(
    { email: adminEmail },
    { $set: { email: adminEmail, passwordHash } },
  );

await portfolioClient.close();

if (!adminResult.matchedCount) {
  throw new Error(`No portfolio admin account exists for ${adminEmail}`);
}

const localValues = {
  ADMIN_EMAIL: adminEmail,
  ADMIN_PASSWORD: newAdminPassword,
  CLIENT_ORIGIN: "http://localhost:3000",
  JWT_SECRET: jwtSecret,
  MONGO_URI: mongoUri,
};

await fs.writeFile(
  envPath,
  Object.entries(localValues)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n") + "\n",
);

const vercelValues = {
  MONGO_URI: mongoUri,
  NODE_ENV: "production",
  ADMIN_EMAIL: adminEmail,
  ADMIN_PASSWORD: newAdminPassword,
  JWT_SECRET: jwtSecret,
  CLIENT_ORIGIN: "https://dev-soham.vercel.app",
};

const command = process.platform === "win32" ? "npx.cmd" : "npx";
for (const [name, value] of Object.entries(vercelValues)) {
  const args = [
    "--yes",
    "vercel@latest",
    "env",
    "add",
    name,
    "--environment",
    "production",
    "--yes",
    "--force",
  ];
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    input: value,
    stdio: ["pipe", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(
      `Vercel failed while setting ${name}: ${result.stderr || result.stdout}`,
    );
  }
}

console.log(`Updated portfolio admin account: ${adminEmail}`);
console.log("Local .env and Vercel production secrets updated");

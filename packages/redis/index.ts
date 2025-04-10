import { Redis } from "ioredis";
import dotenv from "dotenv";
import path from "path";

// Load the environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create a new Redis instance
export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

import dotenv from "dotenv";
import path from "path";
import { Redis } from "ioredis";

// Load the environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is not defined in .env file");
}

// Create a Redis client
export const redisClient = new Redis(REDIS_URL);

// Check the connection
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Check for errors
redisClient.on("error", (error) => {
  console.error("Redis error: ", error);
});

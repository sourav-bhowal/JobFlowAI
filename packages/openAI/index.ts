import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

// Load the environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Create an instance of the OpenAI class
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

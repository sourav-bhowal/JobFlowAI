import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

// Crete a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// Test the connection pool
pool.on("error", (err) => {
  console.error("Database error", err);
});

// Export the connection pool
export const db = drizzle(pool, { schema });

// Export the other modules
export {
  sql,
  cosineDistance,
  lt,
  or,
  and,
  ilike,
  desc,
  inArray,
  gt,
  eq,
  SQL,
} from "drizzle-orm";

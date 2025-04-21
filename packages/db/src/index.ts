import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Crete a connection pool to the PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection pool
pool.on("error", (err) => {
  console.error("Database error", err);
});

// Export the connection pool
export const db = drizzle(pool, { schema });

// Export the other modules
export { sql, cosineDistance, lt } from "drizzle-orm";

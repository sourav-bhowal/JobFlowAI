import { db, lt } from "@repo/db/drizzle";
import { jobs } from "@repo/db/schema";

// Delete jobs older than 5 days from the database
export async function GET(request: Request) {
  try {
    // Headers check
    const authHeader = request.headers.get("Authorization");

    // Check if header is valid
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        { error: "Invalid authorization header" },
        { status: 401 }
      );
    }

    // Get the current date and time
    const fiveDaysAgo = new Date();

    // Subtract 5 days
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Delete all jobs older than 5 days
    await db.delete(jobs).where(lt(jobs.createdAt, fiveDaysAgo));

    // Return success response
    return Response.json(
      { message: "Successfully deleted jobs older than 5 days" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/crons:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

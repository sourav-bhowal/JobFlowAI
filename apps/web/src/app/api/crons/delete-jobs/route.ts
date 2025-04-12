import { db, lt } from "@repo/db/drizzle";
import { jobs } from "@repo/db/schema";

// Delete all jobs from the database
export async function GET(request: Request) {
  try {
    // Headers check
    // const authHeader = request.headers.get("Authorization");

    // // Check if header is valid
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return Response.json(
    //     { error: "Invalid authorization header" },
    //     { status: 401 }
    //   );
    // }

    // Get the current date and time
    const oneMonthAgo = new Date();

    // Set the date to one month ago
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Delete all jobs older than one month
    await db.delete(jobs).where(lt(jobs.createdAt, oneMonthAgo));

    //  Return success response
    return Response.json(
      { message: "Successfully deleted old jobs from the database" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/crons:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

import { NextRequest } from "next/server";
import { auth } from "../../../../utils/auth";
import { User } from "next-auth";
import { cosineDistance, db, sql } from "@repo/db/drizzle";
import { jobs } from "@repo/db/schema";
import { JobsPage, JobWithMatch } from "@/src/utils/utils";

// GET ROUTE FOR USER JOB RECOMMENDATIONS
export async function GET(request: NextRequest) {
  try {
    // Get the cursor from the request URL. The cursor is used for pagination.
    const cursor = request.nextUrl.searchParams.get("cursor") || undefined;

    // Splits the cursor string into two parts using the pipe character as a delimiter. The cursor format is "score|id".
    const [cursorScoreStr, cursorIdStr] = cursor?.split("|") || [];

    // Converts the cursor score string to a number, or sets it to null if not present.
    const cursorScore = cursorScoreStr ? Number(cursorScoreStr) : null;

    // Converts the cursor ID string to a number, or sets it to null if not present.
    const cursorId = cursorIdStr ? Number(cursorIdStr) : null;

    // PAGE SIZE
    const pageSize = 10;

    // Get session from auth
    const session = await auth();

    // Get logged in user
    const loggedInUser = session?.user as User;

    // If user not found then return 401
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user from DB
    const user = await db.query.users.findFirst({
      where: (user, { eq }) =>
        eq(user.username, loggedInUser.username as string),
      with: {
        jobPreferences: true,
      },
    });

    // if user not found
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Get user preferences
    const userVector = user.jobPreferences.vector as number[];

    // Similarity function
    const similarity = sql`1 - (${cosineDistance(jobs.vector, userVector)})`;

    // Threshold for similarity
    const threshold = 0.55;

    // Retrieve jobs from DB
    let query = sql<JobWithMatch[]>`
      SELECT *, ${similarity} AS match_percentage
      FROM ${jobs}
      WHERE ${similarity} > ${threshold}
    `;

    // Add pagination condition if cursor exists
    if (cursorScore !== null && cursorId !== null) {
      query = sql`
        ${query} AND (${similarity}, ${jobs.id}) < (${cursorScore}, ${cursorId})
      `;
    }

    // Add ordering and limit
    query = sql`
      ${query}
      ORDER BY match_percentage DESC, ${jobs.id} DESC
      LIMIT ${pageSize + 1}
    `;

    // Execute the query
    const result = await db.execute(query);

    // Returns an empty jobs array and null cursor if no jobs were found.
    if (result.rows.length === 0) {
      return Response.json({ jobs: [], nextCursor: null });
    }

    // Transforms the result rows to include a rounded percentage for the match score.
    const jobsWithMatch = result.rows.map((row: any) => ({
      ...row,
      matchPercentage: Math.round(row.match_percentage * 100), // convert to %
    }));

    // Gets the row after the current page (if it exists) to use for cursor-based pagination.
    const nextCursorRow = jobsWithMatch[pageSize];

    // Creates the next cursor string if there are more results, or sets it to null if this is the last page.
    const nextCursor =
      nextCursorRow && nextCursorRow.match_percentage !== undefined
        ? `${nextCursorRow.match_percentage}|${nextCursorRow.id}`
        : null;

    // Slice
    const recommendedJobs = jobsWithMatch.slice(0, pageSize) as JobWithMatch[];

    // Filter out jobs with same title and company name
    const uniqueJobs = Array.from(
      new Map(
        recommendedJobs.map((job) => [`${job.title}-${job.company}`, job])
      ).values()
    );

    // Data to return
    const data = {
      jobs: uniqueJobs,
      nextCursor: nextCursor?.toString() || null,
    } as JobsPage;

    // Return the data
    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

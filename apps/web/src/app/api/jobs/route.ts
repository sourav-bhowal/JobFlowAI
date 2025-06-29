import { NextRequest } from "next/server";
import { auth } from "@/src/utils/auth";
import { User } from "next-auth";
import { db, ilike, gt, or, and, desc, eq } from "@repo/db/drizzle";
import { AllJobsPage } from "@/src/utils/utils";
import { jobs } from "@repo/db/schema";

// Build OR condition with ilike on individual words
function buildKeywordOrWords(field: any, input: string) {
  const words = input
    .split(/[\s,]+/) // split on space or comma
    .map((w) => w.trim())
    .filter(Boolean);

  return words.length > 0
    ? or(...words.map((word) => ilike(field, `%${word}%`)))
    : null;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cursorParam = searchParams.get("cursor");

    const rolesParam = searchParams.get("roles") || "";
    const skillsParam = searchParams.get("skills") || "";
    const locationParam = searchParams.get("location") || "";
    const remoteParamRaw = searchParams.get("remote");

    const remoteParam =
      remoteParamRaw === "true"
        ? true
        : remoteParamRaw === "false"
          ? false
          : undefined;

    const pageSize = 10;

    const session = await auth();
    const loggedInUser = session?.user as User;

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: (user, { eq }) =>
        eq(user.username, loggedInUser.username as string),
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const filters: any[] = [];

    // Apply keyword filters (each builds its own OR condition)
    const roleCond = buildKeywordOrWords(jobs.title, rolesParam);
    if (roleCond) filters.push(roleCond);

    const skillCond = buildKeywordOrWords(jobs.skills, skillsParam);
    if (skillCond) filters.push(skillCond);

    const locationCond = buildKeywordOrWords(jobs.location, locationParam);
    if (locationCond) filters.push(locationCond);

    if (remoteParam !== undefined) {
      filters.push(eq(jobs.remote, remoteParam));
    }

    let combinedFilter = filters.length > 0 ? and(...filters) : undefined;

    // Cursor-based pagination
    if (cursorParam) {
      try {
        type Cursor = { createdAt: string; id: string };

        const cursor: Cursor = JSON.parse(decodeURIComponent(cursorParam));

        const cursorDate = new Date(cursor.createdAt);

        if (!isNaN(cursorDate.getTime())) {
          const cursorCond = or(
            gt(jobs.createdAt, cursorDate),
            and(eq(jobs.createdAt, cursorDate), gt(jobs.id, Number(cursor.id)))
          );

          combinedFilter = combinedFilter
            ? and(combinedFilter, cursorCond)
            : cursorCond;
        }
      } catch {
        return Response.json(
          { error: "Invalid cursor format" },
          { status: 400 }
        );
      }
    }

    // Query jobs with or without filters
    const allJobs = await db.query.jobs.findMany({
      where: combinedFilter,
      orderBy: [desc(jobs.createdAt), desc(jobs.id)],
      limit: pageSize,
    });

    const nextCursor =
      allJobs.length === pageSize
        ? {
            createdAt: allJobs[allJobs.length - 1]?.createdAt?.toISOString(),
            id: allJobs[allJobs.length - 1]?.id,
          }
        : null;

    const data: AllJobsPage = {
      jobs: allJobs,
      nextCursor: nextCursor
        ? encodeURIComponent(JSON.stringify(nextCursor))
        : null,
    };

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

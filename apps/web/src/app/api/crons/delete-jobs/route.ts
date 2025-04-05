import prisma from "@repo/database/prisma";

// Delete all jobs from the database
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

    // Delete all jobs from the database that are older than 1 month
    await prisma.job.deleteMany({
      where: {
        createdAt: {
          lte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Delete jobs created more than a month ago
        },
      },
    });

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

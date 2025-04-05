import { internshalaJobScraper, consumeJobsFromQueue } from "@repo/scraper";

// Scraping function to be called by the cron job
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

    // Start the scraping job
    await internshalaJobScraper();

    // Start the consumer
    await consumeJobsFromQueue();
  } catch (error) {
    console.error("Error in GET /api/crons:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

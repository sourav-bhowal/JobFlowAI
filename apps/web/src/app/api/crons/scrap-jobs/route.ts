import { internshalaJobScraper, naukriJobScraper } from "@repo/scraper";

// Scraping function to be called by the cron job
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

    // Scrape jobs from Internshala
    await Promise.all([internshalaJobScraper(), naukriJobScraper()]);

    // Return a success response
    return Response.json(
      { message: "Successfully scraped jobs and started the consumer" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error in GET /api/crons:",
      error instanceof Error ? error.message : error
    );
    return new Response("Internal Server Error", { status: 500 });
  }
}

import prisma from "@repo/database/prisma";
import cron from "node-cron";
import { internshalaJobScraper } from "../jobs/internsala-scraper.js";
import { consumeJobsFromQueue } from "../queue/consumer.js";

// Clean up old scraped jobs every month
export function startScrapedJobCleanup() {
  // Run every month
  cron.schedule("0 0 1 * *", async () => {
    await prisma.job.deleteMany({
      where: {
        createdAt: {
          lte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Delete jobs created more than a month ago
        },
      },
    });
    console.log("Cleaned up old scraped jobs");
  });
}

// Start the cron job to web scrape jobs from Internshala after 12 hrs
export function startScrapingJobs() {
  // Run every 12 hrs
  cron.schedule("* */12 * * *", async () => {
    try {
      await internshalaJobScraper();
    } catch (error) {
      console.error("Error in internshalaJobScraper:", error);
    }

    try {
      await consumeJobsFromQueue();
    } catch (error) {
      console.error("Error in consumeJobsFromQueue:", error);
    }
  });
}

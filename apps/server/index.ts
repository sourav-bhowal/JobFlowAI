import express, { Application } from "express";
import cron from "node-cron";
import { internshalaJobScraper } from "./lib/scraper/internsala-scraper.js";
import { naukriJobScraper } from "./lib/scraper/naukri-scraper.js";
import { consumeJobsFromQueue } from "./lib/queue/consumer.js";
import { ycJobScraper } from "./lib/scraper/yc-scraper.js";

// Express app
const app: Application = express();

// PORT
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Scraper Server is running!! All Systems OK!!!");
});

// Start consuming jobs from the queue
consumeJobsFromQueue()
  .then(() => {
    console.log("Consumer started successfully");
  })
  .catch((error) => {
    console.error("Error starting consumer:", error);
  });

// Cron job to scrape jobs every 6 hours
cron.schedule("0 */6 * * *", async () => {
  try {
    console.log("Scraping jobs...");

    // Call the scrapers for Naukri and Internshala
    const results = await Promise.allSettled([
      naukriJobScraper(),
      internshalaJobScraper(),
      ycJobScraper(),
    ]);

    // Handle the results of the scrapers
    for (const result of results) {
      if (result.status === "fulfilled") {
        console.log(
          "Scraper success:",
          result.status,
          "at time:",
          new Date().toLocaleTimeString()
        );
      } else {
        console.error(
          "Scraper failed:",
          result.reason,
          "at time:",
          new Date().toLocaleTimeString()
        );
      }
    }

    console.log("Jobs scraped successfully!");
  } catch (error) {
    console.error("Error scraping jobs:", error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Scraper Server is running on port ${PORT}!!`);
});

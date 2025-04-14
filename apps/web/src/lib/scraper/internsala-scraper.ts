// import puppeteer, { Browser, Page } from "puppeteer";
import { sendJobsToQueue } from "../queue/producer";
import { SelectJob } from "@repo/db/schema";
import { filterAndFormatJobs } from "@/src/utils/utils";
import { getBrowser } from "./browser";

export const dynamic = "force-dynamic";

// Function to scrape jobs from Internshala
export const internshalaJobScraper = async (): Promise<void> => {
  console.log(`
    ############################################
    # 🚀 Starting Internshala Scraper...
    ############################################
  `);

  // Base URL for Internshala jobs
  const BASE_URL =
    "https://internshala.com/internships/computer-science-internship";

  // Launch Puppeteer browser
  const browser = await getBrowser();

  // Open a new page
  const page = await browser.newPage();

  // Go to the base URL
  await page.goto(BASE_URL, {
    waitUntil: "networkidle2",
  });

  // Auto-scroll function to scroll down the page
  const autoScroll = async (): Promise<void> => {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          let scrollHeightBefore = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeightBefore) {
            clearInterval(timer);
            resolve();
          }
        }, 500);
      });
    });
  };

  // Function to extract job details from the page
  const extractJobs = async (): Promise<SelectJob[]> => {
    return await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".individual_internship")
      ).map((jobElement) => ({
        title:
          jobElement.querySelector(".job-title-href")?.textContent?.trim() ||
          "",
        company:
          jobElement.querySelector(".company-name")?.textContent?.trim() || "",
        location:
          jobElement.querySelector(".locations span a")?.textContent?.trim() ||
          "",
        experience:
          jobElement
            .querySelector(".row-1-item:nth-child(2) span")
            ?.textContent?.trim() || "",
        salary:
          jobElement
            .querySelector(".ic-16-money + span")
            ?.textContent?.trim() || "",
        jobType:
          jobElement.querySelector(".status-li span")?.textContent?.trim() ||
          "",
        logo:
          jobElement
            .querySelector(".internship_logo img")
            ?.getAttribute("src") || "",
        jobLink:
          jobElement.querySelector(".job-title-href")?.getAttribute("href") ||
          "",
        postedAt:
          jobElement
            .querySelector(".status-success span")
            ?.textContent?.trim() || "",
      })) as SelectJob[];
    });
  };

  // Function to get job details from the job page
  const getJobDetails = async (jobUrl: string): Promise<Partial<SelectJob>> => {
    const jobPage = await browser.newPage();

    await jobPage.goto(`https://internshala.com${jobUrl}`, {
      waitUntil: "networkidle2",
    });

    const jobDetails: Partial<SelectJob> = await jobPage.evaluate(() => {
      return {
        description:
          document.querySelector(".text-container")?.textContent?.trim() || "",
        skills: Array.from(
          document.querySelectorAll(".round_tabs_container .round_tabs")
        ).map((el) => el.textContent?.trim() || ""),
      };
    });

    await jobPage.close();

    return jobDetails;
  };

  // Wait for the page to load and display the total number of pages
  let totalPages: number = await page.evaluate(() => {
    return parseInt(
      document.querySelector("#total_pages")?.textContent?.trim() || "1",
      10
    );
  });

  console.log(`Total Pages: ${totalPages}`);

  // Seen set to track unique job links
  const seen = new Set<string>();

  // Loop through the pages to scrape jobs
  for (
    let currentPage = 1;
    currentPage <= Math.min(10, totalPages); // limit to 10 pages for now
    currentPage++
  ) {
    // Auto-scroll to load all jobs on the page
    await autoScroll();

    // Extract jobs from the current page
    let jobsOnPage: SelectJob[] = await extractJobs();

    // Loop through each job to fetch additional details
    for (let i = 0; i < jobsOnPage.length; i++) {
      const job = jobsOnPage[i]; // Get the job object from the array
      if (job?.jobLink) {
        // Check if jobLink is defined
        console.log(`Fetching details for: ${job.title}`);
        const extraDetails = await getJobDetails(job.jobLink); // Fetch extra details
        jobsOnPage[i] = { ...job, ...extraDetails }; // Merge extra details into the job object
      }
    }

    console.log(
      `Scraped Page ${currentPage}/${totalPages}, Jobs on Page: ${jobsOnPage.length}`
    );

    // Filter and format jobs
    const filteredJobs = filterAndFormatJobs(jobsOnPage, seen);

    // Send page-wise jobs to queue
    await sendJobsToQueue(filteredJobs);

    // Check if there are more pages to scrape
    const isLastPage: boolean = await page.evaluate(
      () => document.querySelector("#isLastPage")?.getAttribute("value") === "1"
    );

    // If it's the last page, break the loop
    if (isLastPage) break;

    // Wait for the next button to be clickable and click it
    const nextButton = await page.$("#navigation-forward");
    if (nextButton) {
      await nextButton.click();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      break;
    }
  }
  // Close the browser
  await browser.close();

  // Log the completion message
  console.log(`
    ############################################
    # ✅ Internshala Scraping Complete!         
    # 📄 Jobs scraped and queued page by page. 
    # 🚀 System ready for the next run!         
    ############################################
    `);
};

import { SelectJob } from "@repo/db/schema";
import { getBrowser } from "./browser.js";
import { autoScroll } from "../../utils/autoScroll.js";
import { filterAndFormatJobs } from "../../utils/filterAndFormatJobs.js";
import { sendJobsToQueue } from "../queue/producer.js";

export const ycJobScraper = async (): Promise<void> => {
  console.log(`
    ############################################
    # 🚀 Starting YC Scraper...
    ############################################
  `);

  const BASE_URL = "https://www.ycombinator.com/jobs/role/software-engineer";

  const browser = await getBrowser();

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
    );

    await page.goto(BASE_URL, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    await autoScroll(page);

    const extractJobs = async (): Promise<SelectJob[]> => {
      return await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll<HTMLLIElement>("li.my-2")
        ).map((jobElement) => ({
          title:
            jobElement.querySelector("a.font-semibold")?.textContent?.trim() ||
            "",
          company:
            jobElement
              .querySelector("span.font-bold")
              ?.textContent?.trim()
              .replace(/\s*\([^)]+\)\s*$/, "") || "",
          location:
            jobElement
              .querySelector(".flex-row.flex-wrap > div:nth-child(2)")
              ?.textContent?.trim() || "",
          jobType:
            jobElement
              .querySelector(".flex-row.flex-wrap > div:nth-child(1)")
              ?.textContent?.trim() || "",
          logo:
            jobElement.querySelector("img.rounded-full")?.getAttribute("src") ||
            "",
          jobLink:
            jobElement.querySelector("a.font-semibold")?.getAttribute("href") ||
            "",
          postedAt:
            jobElement
              .querySelector("span.text-gray-400")
              ?.textContent?.trim()
              .replace(/[()]/g, "") || "",
        })) as SelectJob[];
      });
    };

    const getJobDetails = async (
      jobUrl: string
    ): Promise<Partial<SelectJob>> => {

      console.log(`Fetching details for job URL: ${jobUrl}`);

      const jobPage = await browser.newPage();

      await jobPage.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
      );

      await jobPage.goto(`https://www.ycombinator.com/${jobUrl}`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      const jobDetails: Partial<SelectJob> = await jobPage.evaluate(() => {
        const text = (el: Element | null) => el?.textContent?.trim() ?? "";
        return {
          description:
            document.querySelector(".prose")?.textContent?.trim() || "",
          experience:
            Array.from(document.querySelectorAll(".mt-5 > div"))
              .find((div) => text(div.querySelector("strong")) === "Experience")
              ?.querySelector("span")
              ?.textContent?.trim() ?? "",
          salary:
            text(document.querySelector(".ycdc-card h1 + div strong")) || "",
        };
      });

      await jobPage.close();

      return jobDetails;
    };

    const jobsOnPage: SelectJob[] = await extractJobs();

    for (let i = 0; i < jobsOnPage.length; i++) {
      const job = jobsOnPage[i];

      if (job?.jobLink) {
        console.log(`Fetching details for: ${job.title}`);
        const extraDetails = await getJobDetails(job.jobLink);
        jobsOnPage[i] = { ...job, ...extraDetails };
      }
    }

    console.log(`Scraped First Page, Jobs on Page: ${jobsOnPage.length}`);

    const filteredJobs = await filterAndFormatJobs(jobsOnPage, "yc");

    await sendJobsToQueue(filteredJobs);

    await browser.close();

    console.log(`
      ############################################
      # ✅ YC Scraping Complete!         
      # 📄 Jobs scraped from first page only. 
      ############################################
    `);
  } catch (error) {
    console.error("🔥 Error during YC scraping:", error);
    await browser.close();
  }
};

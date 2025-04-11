import { SelectJob } from "@repo/db/schema";
import {
  filterAndFormatNaukriJobs,
  isPostedWithinLast24Hours,
} from "../lib/FilterOldJobPost.js";
import { sendJobsToQueue } from "../queue/producer.js";
import puppeteer, { Browser, Page } from "puppeteer";

export const naukriJobScraper = async (): Promise<void> => {
  const BASE_URL = "https://www.naukri.com/it-jobs";

  const browser: Browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page: Page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 60000 });

  const autoScroll = async (): Promise<void> => {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          const scrollHeightBefore = document.body.scrollHeight;
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

  const extractJobs = async (): Promise<SelectJob[]> => {
    return await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".cust-job-tuple")).map(
        (el) => {
          const titleEl = el.querySelector("h2 a.title");
          const companyEl = el.querySelector(".comp-name");
          const locationEl = el.querySelector(".loc .locWdth");
          const experienceEl = el.querySelector(".expwdth");
          const salaryEl = el.querySelector(".sal-wrap span[title]");
          const logoEl = el.querySelector(".logoImage");
          const postedEl = el.querySelector(".job-post-day");
          const descEl = el.querySelector(".job-desc");
          const tagsEls = el.querySelectorAll(".tags-gt li");

          return {
            title: titleEl?.textContent?.trim() || "",
            company: companyEl?.textContent?.trim() || "",
            location: locationEl?.textContent?.trim() || "",
            experience: experienceEl?.textContent?.trim() || "",
            salary: salaryEl?.textContent?.trim() || "Not disclosed",
            logo: logoEl?.getAttribute("src") || "",
            jobType: "",
            jobLink: titleEl?.getAttribute("href") || "",
            postedAt: postedEl?.textContent?.trim() || "",
            description: descEl?.textContent?.trim() || "",
            skills: Array.from(tagsEls).map(
              (tag) => tag.textContent?.trim() || ""
            ),
          };
        }
      ) as SelectJob[];
    });
  };

  const getJobDetails = async (jobUrl: string): Promise<Partial<SelectJob>> => {
    const jobPage: Page = await browser.newPage();
    await jobPage.goto(jobUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const details = await jobPage.evaluate(() => {
      const descEl = document.querySelector(
        ".styles_JDC__dang-inner-html__h0K4t"
      );
      const skillEls = Array.from(
        document.querySelectorAll(".styles_key-skill__GIPn_ a span")
      );

      return {
        description: descEl?.textContent?.trim() || "",
        skills: skillEls.map((s) => s.textContent?.trim() || ""),
      };
    });

    await jobPage.close();
    return details;
  };

  // Loop over 5 pages (or fewer if "Next" button disappears)
  for (let currentPage = 1; currentPage <= 2; currentPage++) {
    await autoScroll();
    let jobsOnPage = await extractJobs();

    for (let i = 0; i < jobsOnPage.length; i++) {
      const job = jobsOnPage[i];
      if (job?.jobLink) {
        console.log(`Fetching details for: ${job.title}`);
        const extraDetails = await getJobDetails(job.jobLink);
        jobsOnPage[i] = { ...job, ...extraDetails };
      }
    }

    console.log(`Scraped Page ${currentPage}, Jobs: ${jobsOnPage.length}`);

    const filteredJobs = filterAndFormatNaukriJobs(jobsOnPage);

    await sendJobsToQueue(filteredJobs);

    const nextButton = await page.$("#lastCompMark > a:nth-child(4)");
    if (nextButton) {
      await nextButton.click();
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } else {
      console.log("No more pages found.");
      break;
    }
  }

  await browser.close();
  console.log(`
    ############################################
    # ✅ Naukri Scraping Complete!
    # 📄 Jobs scraped and queued.
    ############################################
  `);
};

naukriJobScraper();

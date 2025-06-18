import { SelectJob } from "@repo/db/schema";
import { redisClient } from "@repo/redis";

// Function to check if a job was posted within the last 24 hours
export const isPostedWithinLast24Hours = (postedAt: string): boolean => {
  const now = new Date();

  const regex = /(?:(\d+)|a few|few)\s+(second|minute|hour|day)s?\s+ago/i;
  const match = postedAt.match(regex);

  if (!match) return false;

  const amount = match[1] ? parseInt(match[1], 10) : 1; // "few" or "a few" treated as 1
  const unit = match[2]?.toLowerCase() || "";

  const postedDate = new Date(now);
  switch (unit) {
    case "second":
      postedDate.setSeconds(now.getSeconds() - amount);
      break;
    case "minute":
      postedDate.setMinutes(now.getMinutes() - amount);
      break;
    case "hour":
      postedDate.setHours(now.getHours() - amount);
      break;
    case "day":
      postedDate.setDate(now.getDate() - amount);
      break;
    default:
      return false;
  }

  const diff = now.getTime() - postedDate.getTime();
  return diff <= 1000 * 60 * 60 * 24; // within 24 hours
};

// Function to filter and format jobs from Naukri and Internshala
export const filterAndFormatJobs = async (
  jobs: SelectJob[],
  source: "naukri" | "internshala"
): Promise<SelectJob[]> => {
  // Array of unique jobs to be returned
  const results: SelectJob[] = [];

  // Check if jobs are empty or undefined then return empty array
  for (const job of jobs) {
    if (!job.title?.trim() || !isPostedWithinLast24Hours(job.postedAt || "")) {
      continue;
    }

    // Create a unique key for the job
    const key = `${source}:${job.title.trim().toLowerCase()}|${job.company?.trim().toLowerCase()}|${job.location?.trim().toLowerCase()}`;

    // Check if key exists in Redis (individual key approach)
    const isDuplicate = await redisClient.exists(`seen_jobs:${key}`);

    if (!isDuplicate) {
      // Set key with 7 day expiration
      await redisClient.set(`seen_jobs:${key}`, 1, "EX", 60 * 60 * 24 * 7);
      // Normalize job link if needed
      const finalJob = {
        ...job,
        jobLink:
          source === "internshala" &&
          job.jobLink &&
          !job.jobLink.startsWith("http")
            ? `https://www.internshala.com${job.jobLink}`
            : job.jobLink,
      };

      // Add the job to the results array
      results.push(finalJob);
    }
  }

  return results;
};

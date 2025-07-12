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

// New function to check if posted within last N days
const isPostedWithinLastNDays = (postedAt: string, n: number): boolean => {
  const match = postedAt.match(/(\d+)\s+day/);
  if (match) {
    const days = match[1] ? parseInt(match[1], 10) : 0; // Default to 0 if undefined
    return days <= n;
  }
  return false;
};

// Function to filter and format jobs from Naukri and Internshala
export const filterAndFormatJobs = async (
  jobs: SelectJob[],
  source: "naukri" | "internshala" | "yc" | "other"
): Promise<SelectJob[]> => {
  const results: SelectJob[] = [];

  for (const job of jobs) {
    const postedAt = job.postedAt || "";

    const isRecent =
      source === "yc"
        ? isPostedWithinLastNDays(postedAt, 10)
        : isPostedWithinLast24Hours(postedAt);

    if (!job.title?.trim() || !isRecent) {
      continue;
    }

    const key = `${source}:${job.title.trim().toLowerCase()}|${job.company
      ?.trim()
      .toLowerCase()}|${job.location?.trim().toLowerCase()}`;

    const isDuplicate = await redisClient.exists(`seen_jobs:${key}`);

    if (!isDuplicate) {
      await redisClient.set(`seen_jobs:${key}`, 1, "EX", 60 * 60 * 24 * 14);

      const finalJob = {
        ...job,
        jobLink: (() => {
          if (!job.jobLink || job.jobLink.startsWith("http"))
            return job.jobLink;

          switch (source) {
            case "internshala":
              return `https://www.internshala.com${job.jobLink}`;
            case "yc":
              return `https://www.ycombinator.com${job.jobLink}`;
            default:
              return job.jobLink; // Fallback: return as is
          }
        })(),
      };

      results.push(finalJob);
    }
  }

  return results;
};

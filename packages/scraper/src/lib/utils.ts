import { SelectJob } from "@repo/db/src/schema";

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

// Function to filter and format jobs
export const filterAndFormatJobs = (jobs: SelectJob[]): SelectJob[] => {
  const seen = new Set<string>();

  return jobs
    .filter((job) => job.title && job.title.trim() !== "")
    .filter((job) => isPostedWithinLast24Hours(job.postedAt || ""))
    .filter((job) => {
      const key = `${job.title?.trim().toLowerCase()}|${job.company?.trim().toLowerCase()}|${job.location?.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((job) => ({
      ...job,
      jobLink: job.jobLink?.startsWith("http")
        ? job.jobLink
        : `https://www.internshala.com${job.jobLink}`,
    }));
};

// Function to filter and format jobs from Naukri
export const filterAndFormatNaukriJobs = (jobs: SelectJob[]): SelectJob[] => {
  const seen = new Set<string>();

  return jobs
    .filter((job) => job.title && job.title.trim() !== "")
    .filter((job) => isPostedWithinLast24Hours(job.postedAt || ""))
    .filter((job) => {
      const key = `${job.title?.trim().toLowerCase()}|${job.company?.trim().toLowerCase()}|${job.location?.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

import { SelectJob } from "@repo/db/schema";

export const isPostedWithinLast24Hours = (postedAt: string): boolean => {
  const now = new Date();

  const regex = /(\d+)\s+(second|minute|hour|day)s?\s+ago/;
  const match = postedAt.match(regex);

  if (!match) return false;

  const amount = parseInt(match[1] || "0", 10); // Provide a default value of '0' if match[1] is undefined
  const unit = match[2] || ""; // Provide a default value of an empty string if match[2] is undefined

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
  return diff <= 1000 * 60 * 60 * 24; // 24 hours in ms
};

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
        : `https://internshala.com${job.jobLink}`,
    }));
};

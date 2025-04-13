import { JobType, SelectJob } from "@repo/db/schema";

// This function checks if two objects are equal by comparing their keys and values recursively.
export const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  // Check if both are objects
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return obj1 === obj2; // Direct comparison for non-objects
  }

  // Get keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is different
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check each key and value
  for (const key of keys1) {
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true; // Objects are equal
};

// Navigation links for the website
export const navLinks = [
  { name: "Home", href: "/" },
  // { name: "Find Jobs", href: "/#find-jobs" },
  { name: "Recommendations", href: "/#recommendations" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "FAQ", href: "/#faq" },
];

// Protected links
export const protectedNavLinks = [
  { name: "Profile", href: "/user/profile" },
  // { name: "Jobs", href: "/jobs" },
  { name: "Recommendations", href: "/user/my-recommendations" },
];

// Job type options for the form
export const jobTypeOptions: { label: string; value: JobType }[] = [
  { label: "Full-time", value: "FULL_TIME" },
  { label: "Part-time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Internship", value: "INTERNSHIP" },
];

// Job preferences options for the form
export const desiredRolesOptions: { label: string; value: string }[] = [
  { label: "Software Engineer", value: "Software Engineer" },
  { label: "Web Developer", value: "Web Developer" },
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "Designer", value: "Designer" },
  { label: "Marketing", value: "Marketing" },
  { label: "Sales", value: "Sales" },
  { label: "HR", value: "HR" },
  { label: "Finance", value: "Finance" },
  { label: "Operations", value: "Operations" },
  { label: "Customer Support", value: "Customer Support" },
  { label: "Content Writer", value: "Content Writer" },
  { label: "Data Analyst", value: "Data Analyst" },
  { label: "Business Analyst", value: "Business Analyst" },
  { label: "Project Manager", value: "Project Manager" },
  { label: "Research Scientist", value: "Research Scientist" },
  { label: "Quality Assurance", value: "Quality Assurance" },
  { label: "Network Engineer", value: "Network Engineer" },
  { label: "System Administrator", value: "System Administrator" },
  { label: "DevOps Engineer", value: "DevOps Engineer" },
  { label: "Cloud Engineer", value: "Cloud Engineer" },
  { label: "Cybersecurity Analyst", value: "Cybersecurity Analyst" },
  { label: "Game Developer", value: "Game Developer" },
  { label: "Mobile App Developer", value: "Mobile App Developer" },
  { label: "UI/UX Designer", value: "UI/UX Designer" },
  { label: "Graphic Designer", value: "Graphic Designer" },
  { label: "SEO Specialist", value: "SEO Specialist" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "Social Media Manager", value: "Social Media Manager" },
  { label: "Sales Executive", value: "Sales Executive" },
  { label: "Account Manager", value: "Account Manager" },
  { label: "Business Development", value: "Business Development" },
  { label: "Recruiter", value: "Recruiter" },
  { label: "Financial Analyst", value: "Financial Analyst" },
  { label: "Accountant", value: "Accountant" },
  { label: "Operations Manager", value: "Operations Manager" },
  { label: "Customer Success Manager", value: "Customer Success Manager" },
  { label: "Content Marketing", value: "Content Marketing" },
  { label: "Public Relations", value: "Public Relations" },
  { label: "Event Coordinator", value: "Event Coordinator" },
  { label: "Other", value: "Other" },
];

// Job locations options for the form
export const desiredLocationsOptions: { label: string; value: string }[] = [
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Bengaluru", value: "Bengaluru" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Chennai", value: "Chennai" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Pune", value: "Pune" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Surat", value: "Surat" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Indore", value: "Indore" },
  { label: "Bhopal", value: "Bhopal" },
  { label: "Nagpur", value: "Nagpur" },
  { label: "Coimbatore", value: "Coimbatore" },
  { label: "Visakhapatnam", value: "Visakhapatnam" },
  { label: "Kochi", value: "Kochi" },
  { label: "Noida", value: "Noida" },
  { label: "Gurgaon", value: "Gurgaon" },
  { label: "Ghaziabad", value: "Ghaziabad" },
  { label: "Faridabad", value: "Faridabad" },
  { label: "Vadodara", value: "Vadodara" },
  { label: "Nashik", value: "Nashik" },
  { label: "Rajkot", value: "Rajkot" },
  { label: "Mysuru", value: "Mysuru" },
  { label: "Vijayawada", value: "Vijayawada" },
  { label: "Aurangabad", value: "Aurangabad" },
  { label: "Amritsar", value: "Amritsar" },
  { label: "Ludhiana", value: "Ludhiana" },
  { label: "Dehradun", value: "Dehradun" },
  { label: "Ranchi", value: "Ranchi" },
  { label: "Patna", value: "Patna" },
  { label: "Guwahati", value: "Guwahati" },
  { label: "Agra", value: "Agra" },
  { label: "Varanasi", value: "Varanasi" },
  { label: "Other", value: "Other" },
];

// Skills options for the form
export const desiredSkillsOptions: { label: string; value: string }[] = [
  { label: "JavaScript", value: "JavaScript" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C++", value: "C++" },
  { label: "C#", value: "C#" },
  { label: "Ruby", value: "Ruby" },
  { label: "PHP", value: "PHP" },
  { label: "Swift", value: "Swift" },
  { label: "Go", value: "Go" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Rust", value: "Rust" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "SQL", value: "SQL" },
  { label: "NoSQL", value: "NoSQL" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Deep Learning", value: "Deep Learning" },
  { label: "Data Analysis", value: "Data Analysis" },
  { label: "Data Visualization", value: "Data Visualization" },
  { label: "Cloud Computing", value: "Cloud Computing" },
  { label: "DevOps", value: "DevOps" },
  { label: "Agile", value: "Agile" },
  { label: "Scrum", value: "Scrum" },
  { label: "Project Management", value: "Project Management" },
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Graphic Design", value: "Graphic Design" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "SEO", value: "SEO" },
  { label: "Content Writing", value: "Content Writing" },
  { label: "Social Media Marketing", value: "Social Media Marketing" },
  { label: "Salesforce", value: "Salesforce" },
  { label: "SAP", value: "SAP" },
  { label: "Oracle", value: "Oracle" },
  { label: "Microsoft Office", value: "Microsoft Office" },
  { label: "Excel", value: "Excel" },
  { label: "PowerPoint", value: "PowerPoint" },
  { label: "Word", value: "Word" },
  { label: "Google Workspace", value: "Google Workspace" },
  { label: "Zoom", value: "Zoom" },
  { label: "Slack", value: "Slack" },
  { label: "Trello", value: "Trello" },
  { label: "Asana", value: "Asana" },
  { label: "Jira", value: "Jira" },
  { label: "Git", value: "Git" },
  { label: "GitHub", value: "GitHub" },
  { label: "GitLab", value: "GitLab" },
  { label: "Bitbucket", value: "Bitbucket" },
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "AWS", value: "AWS" },
  { label: "Azure", value: "Azure" },
  { label: "Google Cloud", value: "Google Cloud" },
  { label: "IBM Cloud", value: "IBM Cloud" },
  { label: "Sales", value: "Sales" },
  { label: "Customer Service", value: "Customer Service" },
  { label: "Negotiation", value: "Negotiation" },
  { label: "Public Speaking", value: "Public Speaking" },
  { label: "Time Management", value: "Time Management" },
  { label: "Problem Solving", value: "Problem Solving" },
  { label: "Critical Thinking", value: "Critical Thinking" },
  { label: "Teamwork", value: "Teamwork" },
  { label: "Leadership", value: "Leadership" },
  { label: "Adaptability", value: "Adaptability" },
  { label: "Other", value: "Other" },
];

// Jobs Page interface for pagination
export interface JobsPage {
  jobs: JobWithMatch[];
  nextCursor: string | null;
}

// SelectJob interface extends the JobType interface from the database schema
export interface JobWithMatch extends SelectJob {
  matchPercentage: number;
}

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

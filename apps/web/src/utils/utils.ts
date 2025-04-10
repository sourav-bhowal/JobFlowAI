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
  { name: "Find Jobs", href: "/jobs" },
  { name: "Recommendations", href: "/contact" },
  { name: "How It Works", href: "/blog" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
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
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
  // Software Engineering & Development
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Full Stack Developer", value: "Full Stack Developer" },
  { label: "Java Developer", value: "Java Developer" },
  { label: "Python Developer", value: "Python Developer" },
  { label: "Node.js Developer", value: "Node.js Developer" },
  { label: "React Developer", value: "React Developer" },
  { label: "Angular Developer", value: "Angular Developer" },
  { label: "Vue.js Developer", value: "Vue.js Developer" },
  { label: ".NET Developer", value: ".NET Developer" },
  { label: "C++ Developer", value: "C++ Developer" },
  { label: "Ruby on Rails Developer", value: "Ruby on Rails Developer" },
  { label: "Go Developer", value: "Go Developer" },
  { label: "PHP Developer", value: "PHP Developer" },
  { label: "API Developer", value: "API Developer" },
  { label: "Embedded Systems Engineer", value: "Embedded Systems Engineer" },
  { label: "Software Architect", value: "Software Architect" },
  { label: "Application Developer", value: "Application Developer" },

  // Web Development
  { label: "Web Developer", value: "Web Developer" },
  { label: "WordPress Developer", value: "WordPress Developer" },
  { label: "Shopify Developer", value: "Shopify Developer" },
  { label: "Webflow Developer", value: "Webflow Developer" },
  { label: "HTML/CSS Developer", value: "HTML/CSS Developer" },
  { label: "JavaScript Developer", value: "JavaScript Developer" },
  { label: "UI Developer", value: "UI Developer" },

  // Mobile Development
  { label: "Mobile App Developer", value: "Mobile App Developer" },
  { label: "Android Developer", value: "Android Developer" },
  { label: "iOS Developer", value: "iOS Developer" },
  { label: "Flutter Developer", value: "Flutter Developer" },
  { label: "React Native Developer", value: "React Native Developer" },
  { label: "Xamarin Developer", value: "Xamarin Developer" },
  { label: "Swift Developer", value: "Swift Developer" },

  // Data & AI
  { label: "Data Scientist", value: "Data Scientist" },
  { label: "Data Analyst", value: "Data Analyst" },
  { label: "Machine Learning Engineer", value: "Machine Learning Engineer" },
  { label: "AI Engineer", value: "AI Engineer" },
  { label: "Deep Learning Engineer", value: "Deep Learning Engineer" },
  { label: "NLP Engineer", value: "NLP Engineer" },
  { label: "Computer Vision Engineer", value: "Computer Vision Engineer" },
  { label: "Data Engineer", value: "Data Engineer" },
  {
    label: "Business Intelligence Analyst",
    value: "Business Intelligence Analyst",
  },
  { label: "Research Scientist", value: "Research Scientist" },

  // Cloud & DevOps
  { label: "DevOps Engineer", value: "DevOps Engineer" },
  { label: "Site Reliability Engineer", value: "Site Reliability Engineer" },
  { label: "Cloud Engineer", value: "Cloud Engineer" },
  { label: "AWS Engineer", value: "AWS Engineer" },
  { label: "Azure Engineer", value: "Azure Engineer" },
  { label: "GCP Engineer", value: "GCP Engineer" },
  { label: "Infrastructure Engineer", value: "Infrastructure Engineer" },
  { label: "Platform Engineer", value: "Platform Engineer" },
  { label: "Kubernetes Engineer", value: "Kubernetes Engineer" },
  { label: "CI/CD Engineer", value: "CI/CD Engineer" },

  // Cybersecurity
  { label: "Cybersecurity Analyst", value: "Cybersecurity Analyst" },
  { label: "Security Engineer", value: "Security Engineer" },
  {
    label: "Information Security Analyst",
    value: "Information Security Analyst",
  },
  { label: "Penetration Tester", value: "Penetration Tester" },
  { label: "Ethical Hacker", value: "Ethical Hacker" },
  { label: "SOC Analyst", value: "SOC Analyst" },
  { label: "Security Architect", value: "Security Architect" },

  // QA & Testing
  { label: "QA Engineer", value: "QA Engineer" },
  { label: "Test Automation Engineer", value: "Test Automation Engineer" },
  { label: "Manual Tester", value: "Manual Tester" },
  { label: "SDET", value: "SDET" },
  { label: "Performance Tester", value: "Performance Tester" },

  // IT & Systems
  { label: "System Administrator", value: "System Administrator" },
  { label: "Network Engineer", value: "Network Engineer" },
  { label: "IT Support Specialist", value: "IT Support Specialist" },
  { label: "IT Administrator", value: "IT Administrator" },
  { label: "Database Administrator", value: "Database Administrator" },
  { label: "Technical Support Engineer", value: "Technical Support Engineer" },

  // Design & Creative
  { label: "UI Designer", value: "UI Designer" },
  { label: "UX Designer", value: "UX Designer" },
  { label: "UI/UX Designer", value: "UI/UX Designer" },
  { label: "Product Designer", value: "Product Designer" },
  { label: "Visual Designer", value: "Visual Designer" },
  { label: "Graphic Designer", value: "Graphic Designer" },
  { label: "Motion Graphics Designer", value: "Motion Graphics Designer" },
  { label: "Interaction Designer", value: "Interaction Designer" },

  // Product & Project Management
  { label: "Product Manager", value: "Product Manager" },
  { label: "Technical Product Manager", value: "Technical Product Manager" },
  { label: "Associate Product Manager", value: "Associate Product Manager" },
  { label: "Project Manager", value: "Project Manager" },
  { label: "Technical Project Manager", value: "Technical Project Manager" },
  { label: "Program Manager", value: "Program Manager" },
  { label: "Scrum Master", value: "Scrum Master" },
  { label: "Agile Coach", value: "Agile Coach" },

  // Marketing
  { label: "Digital Marketing Manager", value: "Digital Marketing Manager" },
  { label: "SEO Specialist", value: "SEO Specialist" },
  { label: "SEM Specialist", value: "SEM Specialist" },
  { label: "Growth Hacker", value: "Growth Hacker" },
  { label: "Social Media Manager", value: "Social Media Manager" },
  { label: "Performance Marketer", value: "Performance Marketer" },
  { label: "Marketing Analyst", value: "Marketing Analyst" },
  { label: "Email Marketing Specialist", value: "Email Marketing Specialist" },
  { label: "Content Marketing Manager", value: "Content Marketing Manager" },
  { label: "Content Strategist", value: "Content Strategist" },
  { label: "Paid Ads Specialist", value: "Paid Ads Specialist" },

  // Content & Writing
  { label: "Content Writer", value: "Content Writer" },
  { label: "Copywriter", value: "Copywriter" },
  { label: "Technical Writer", value: "Technical Writer" },
  { label: "UX Writer", value: "UX Writer" },
  { label: "Editor", value: "Editor" },
  { label: "Blog Writer", value: "Blog Writer" },
  { label: "Scriptwriter", value: "Scriptwriter" },
  { label: "SEO Content Writer", value: "SEO Content Writer" },

  // Sales & Customer Success
  { label: "Sales Executive", value: "Sales Executive" },
  { label: "Account Executive", value: "Account Executive" },
  {
    label: "Business Development Executive",
    value: "Business Development Executive",
  },
  {
    label: "Sales Development Representative",
    value: "Sales Development Representative",
  },
  { label: "Account Manager", value: "Account Manager" },
  { label: "Key Account Manager", value: "Key Account Manager" },
  {
    label: "Customer Support Representative",
    value: "Customer Support Representative",
  },
  { label: "Customer Success Manager", value: "Customer Success Manager" },

  // HR & Recruiting
  { label: "HR Generalist", value: "HR Generalist" },
  { label: "HR Manager", value: "HR Manager" },
  { label: "Technical Recruiter", value: "Technical Recruiter" },
  {
    label: "Talent Acquisition Specialist",
    value: "Talent Acquisition Specialist",
  },
  { label: "People Operations", value: "People Operations" },
  { label: "HR Business Partner", value: "HR Business Partner" },

  // Finance & Operations
  { label: "Financial Analyst", value: "Financial Analyst" },
  { label: "Accountant", value: "Accountant" },
  { label: "Finance Manager", value: "Finance Manager" },
  { label: "Operations Executive", value: "Operations Executive" },
  { label: "Operations Manager", value: "Operations Manager" },
  { label: "Business Analyst", value: "Business Analyst" },
  { label: "Strategy Analyst", value: "Strategy Analyst" },

  // PR & Events
  { label: "PR Specialist", value: "PR Specialist" },
  { label: "Public Relations Manager", value: "Public Relations Manager" },
  { label: "Event Coordinator", value: "Event Coordinator" },
  { label: "Event Manager", value: "Event Manager" },
  { label: "Community Manager", value: "Community Manager" },

  // Game Development
  { label: "Game Developer", value: "Game Developer" },
  { label: "Unity Developer", value: "Unity Developer" },
  { label: "Unreal Engine Developer", value: "Unreal Engine Developer" },
  { label: "Game Designer", value: "Game Designer" },
  { label: "Game Tester", value: "Game Tester" },
  { label: "3D Artist", value: "3D Artist" },

  // Other / Niche
  { label: "Technical Support", value: "Technical Support" },
  { label: "Hardware Engineer", value: "Hardware Engineer" },
  { label: "Robotics Engineer", value: "Robotics Engineer" },
  { label: "Blockchain Developer", value: "Blockchain Developer" },
  { label: "AR/VR Developer", value: "AR/VR Developer" },
  {
    label: "Quantum Computing Researcher",
    value: "Quantum Computing Researcher",
  },
  { label: "No-Code Developer", value: "No-Code Developer" },
  { label: "Low-Code Developer", value: "Low-Code Developer" },
  { label: "Tech Evangelist", value: "Tech Evangelist" },
  { label: "Other", value: "Other" },
];

// Job locations options for the form
export const desiredLocationsOptions: { label: string; value: string }[] = [
  // Metro & Tier 1 Cities
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Bengaluru", value: "Bengaluru" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Chennai", value: "Chennai" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Pune", value: "Pune" },
  { label: "Ahmedabad", value: "Ahmedabad" },

  // NCR & Surrounding
  { label: "Noida", value: "Noida" },
  { label: "Gurgaon", value: "Gurgaon" },
  { label: "Ghaziabad", value: "Ghaziabad" },
  { label: "Faridabad", value: "Faridabad" },

  // Tier 2 & 3 Cities
  { label: "Jaipur", value: "Jaipur" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Indore", value: "Indore" },
  { label: "Bhopal", value: "Bhopal" },
  { label: "Nagpur", value: "Nagpur" },
  { label: "Coimbatore", value: "Coimbatore" },
  { label: "Visakhapatnam", value: "Visakhapatnam" },
  { label: "Kochi", value: "Kochi" },
  { label: "Vadodara", value: "Vadodara" },
  { label: "Surat", value: "Surat" },
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
  { label: "Jodhpur", value: "Jodhpur" },
  { label: "Udaipur", value: "Udaipur" },
  { label: "Allahabad", value: "Allahabad" },
  { label: "Jabalpur", value: "Jabalpur" },
  { label: "Trivandrum", value: "Trivandrum" },
  { label: "Thrissur", value: "Thrissur" },
  { label: "Madurai", value: "Madurai" },
  { label: "Salem", value: "Salem" },
  { label: "Hubli", value: "Hubli" },
  { label: "Belgaum", value: "Belgaum" },
  { label: "Warangal", value: "Warangal" },
  { label: "Tirupati", value: "Tirupati" },
  { label: "Guntur", value: "Guntur" },
  { label: "Bhavnagar", value: "Bhavnagar" },
  { label: "Dhanbad", value: "Dhanbad" },
  { label: "Raipur", value: "Raipur" },
  { label: "Bilaspur", value: "Bilaspur" },
  { label: "Silchar", value: "Silchar" },
  { label: "Shillong", value: "Shillong" },
  { label: "Imphal", value: "Imphal" },
  { label: "Aizawl", value: "Aizawl" },
  { label: "Itanagar", value: "Itanagar" },
  { label: "Panaji", value: "Panaji" },

  // Flexible / Remote
  { label: "Remote", value: "Remote" },
  { label: "Other", value: "Other" },
];

// Skills options for the form
export const desiredSkillsOptions: { label: string; value: string }[] = [
  // Programming Languages
  { label: "JavaScript", value: "JavaScript" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C++", value: "C++" },
  { label: "C#", value: "C#" },
  { label: "Go", value: "Go" },
  { label: "Rust", value: "Rust" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Swift", value: "Swift" },
  { label: "Ruby", value: "Ruby" },
  { label: "PHP", value: "PHP" },
  { label: "Shell Scripting", value: "Shell Scripting" },

  // Web Development
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "SASS", value: "SASS" },
  { label: "Tailwind CSS", value: "Tailwind CSS" },
  { label: "React.js", value: "React.js" },
  { label: "Next.js", value: "Next.js" },
  { label: "Angular", value: "Angular" },
  { label: "Vue.js", value: "Vue.js" },
  { label: "Node.js", value: "Node.js" },
  { label: "Express.js", value: "Express.js" },
  { label: "Django", value: "Django" },
  { label: "Flask", value: "Flask" },
  { label: "Laravel", value: "Laravel" },
  { label: "Spring Boot", value: "Spring Boot" },
  { label: "ASP.NET", value: "ASP.NET" },

  // Mobile Development
  { label: "React Native", value: "React Native" },
  { label: "Flutter", value: "Flutter" },
  { label: "SwiftUI", value: "SwiftUI" },
  { label: "Android SDK", value: "Android SDK" },
  { label: "iOS Development", value: "iOS Development" },

  // Databases
  { label: "SQL", value: "SQL" },
  { label: "MySQL", value: "MySQL" },
  { label: "PostgreSQL", value: "PostgreSQL" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "Firebase", value: "Firebase" },
  { label: "Redis", value: "Redis" },
  { label: "SQLite", value: "SQLite" },
  { label: "Oracle Database", value: "Oracle Database" },

  // DevOps & Cloud
  { label: "Git", value: "Git" },
  { label: "GitHub", value: "GitHub" },
  { label: "GitLab", value: "GitLab" },
  { label: "Bitbucket", value: "Bitbucket" },
  { label: "Docker", value: "Docker" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "CI/CD", value: "CI/CD" },
  { label: "Jenkins", value: "Jenkins" },
  { label: "AWS", value: "AWS" },
  { label: "Azure", value: "Azure" },
  { label: "Google Cloud", value: "Google Cloud" },
  { label: "Heroku", value: "Heroku" },
  { label: "Netlify", value: "Netlify" },
  { label: "Vercel", value: "Vercel" },

  // Data & AI
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Deep Learning", value: "Deep Learning" },
  {
    label: "Natural Language Processing",
    value: "Natural Language Processing",
  },
  { label: "Computer Vision", value: "Computer Vision" },
  { label: "Data Analysis", value: "Data Analysis" },
  { label: "Data Visualization", value: "Data Visualization" },
  { label: "Pandas", value: "Pandas" },
  { label: "NumPy", value: "NumPy" },
  { label: "Matplotlib", value: "Matplotlib" },
  { label: "Scikit-learn", value: "Scikit-learn" },
  { label: "TensorFlow", value: "TensorFlow" },
  { label: "PyTorch", value: "PyTorch" },
  { label: "OpenCV", value: "OpenCV" },

  // Project Management & Tools
  { label: "Agile", value: "Agile" },
  { label: "Scrum", value: "Scrum" },
  { label: "Kanban", value: "Kanban" },
  { label: "Jira", value: "Jira" },
  { label: "Trello", value: "Trello" },
  { label: "Asana", value: "Asana" },
  { label: "Notion", value: "Notion" },
  { label: "Slack", value: "Slack" },
  { label: "Zoom", value: "Zoom" },

  // Design
  { label: "UI/UX Design", value: "UI/UX Design" },
  { label: "Figma", value: "Figma" },
  { label: "Adobe XD", value: "Adobe XD" },
  { label: "Sketch", value: "Sketch" },
  { label: "Graphic Design", value: "Graphic Design" },
  { label: "Adobe Photoshop", value: "Adobe Photoshop" },
  { label: "Adobe Illustrator", value: "Adobe Illustrator" },

  // Marketing
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "SEO", value: "SEO" },
  { label: "SEM", value: "SEM" },
  { label: "Google Analytics", value: "Google Analytics" },
  { label: "Email Marketing", value: "Email Marketing" },
  { label: "Content Writing", value: "Content Writing" },
  { label: "Copywriting", value: "Copywriting" },
  { label: "Social Media Marketing", value: "Social Media Marketing" },
  { label: "Growth Hacking", value: "Growth Hacking" },

  // Soft Skills
  { label: "Public Speaking", value: "Public Speaking" },
  { label: "Time Management", value: "Time Management" },
  { label: "Problem Solving", value: "Problem Solving" },
  { label: "Critical Thinking", value: "Critical Thinking" },
  { label: "Teamwork", value: "Teamwork" },
  { label: "Leadership", value: "Leadership" },
  { label: "Adaptability", value: "Adaptability" },
  { label: "Negotiation", value: "Negotiation" },
  { label: "Customer Service", value: "Customer Service" },

  // Other
  { label: "Microsoft Office", value: "Microsoft Office" },
  { label: "Excel", value: "Excel" },
  { label: "PowerPoint", value: "PowerPoint" },
  { label: "Word", value: "Word" },
  { label: "Google Workspace", value: "Google Workspace" },
  { label: "Other", value: "Other" },
];

export interface AllJobsPage {
  jobs: SelectJob[],
  nextCursor: string | null
}

// Jobs Page interface for pagination
export interface JobsPage {
  jobs: JobWithMatch[];
  nextCursor: string | null;
}

// SelectJob interface extends the JobType interface from the database schema
export interface JobWithMatch extends SelectJob {
  matchPercentage: number;
}
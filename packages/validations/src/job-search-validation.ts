import { z } from "zod";

// Job search validation schema
export const jobSearchSchema = z.object({
  jobTitle: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(["All Types", "Full-Time", "Part-Time", "Contract"]).optional(),
  skills: z.array(z.string()).optional(),
  showAiMatches: z.boolean(),
});

// Type definition for job search form values
export type JobSearchFormValues = z.infer<typeof jobSearchSchema>;

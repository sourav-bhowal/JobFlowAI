import { createJobEmbedding } from "./jobEmbedding";
import { jobs, SelectJob } from "@repo/db/schema";
import { db } from "@repo/db/drizzle";

// Function to insert jobs into the database
export async function insertJobInDB(jobBatch: SelectJob[]) {
  try {
    if (!jobBatch || jobBatch.length === 0) {
      console.log("No job to insert in DB");
      return;
    }

    // Step 1: Generate embeddings for each job
    const jobEmbeddings = await createJobEmbedding(jobBatch); // returns Float[][]

    // Step 2: Prepare the data for insertion
    const jobsToInsert = jobBatch.map((job, index) => ({
      companyName: job.companyName,
      companyLink: job.companyLink,
      responsibilities: job.responsibilities,
      tags: job.tags,
      benefits: job.benefits,
      currency: job.currency,
      salaryFrequency: job.salaryFrequency,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      insights: job.insights,
      applyLink: job.applyLink,
      applyBy: job.applyBy,

      // Internshala specific fields
      title: job.title || "",
      company: job.company,
      location: job.location,
      experience: job.experience,
      remote:
        job.location === "Remote" ||
        job.location === "Work from Home" ||
        job.location === "Work from home" ||
        job.location === "remote" ||
        job.remote,
      salary: job.salary,
      jobType: job.jobType,
      logo: job.logo,
      jobLink: job.jobLink,
      description: job.description,
      skills: job.skills,
      postedAt: job.postedAt,
      vector: jobEmbeddings[index], // embedding for the job
    }));

    // Step 3: Insert jobs into the database
    await db.insert(jobs).values(jobsToInsert);

    console.log(`Inserted ${jobBatch.length} jobs into DB`);
  } catch (error) {
    console.error("❌ Error inserting jobs into DB:", error);
  }
}

import { openai } from "@repo/openai";
import { SelectJob } from "@repo/db/src/schema";

// Function to create job embeddings
export async function createJobEmbedding(jobData: SelectJob[]) {
  // Input text for the OpenAI API
  const inputText = jobData.map(
    (job) =>
      `Job Title: ${job.title}` +
      `Job Description: ${job.description}` +
      `Required Skills: ${job.skills?.join(", ") ?? ""}` +
      `Location: ${job.location ?? ""}` +
      `Job Type: ${job.jobType ?? ""}` +
      `Remote: ${job.remote ? "Yes" : "No"}`
  );

  // Trancate the input text to 2048 characters
  const truncatedText = inputText.slice(0, 8000);

  // Create the job embedding
  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small", // Use the text-embedding-3-small model
      input: truncatedText, // Input text
    });

    console.log("Job embedding created.");

    // Return the embedding
    return embedding.data.map((item) => item.embedding);
  } catch (error) {
    console.error("Error creating job embedding", error);
    throw new Error("Error creating job embedding");
  }
}

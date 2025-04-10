import { openai } from "@repo/openai";
import { UpdateJobPreferencesSchemaType } from "@repo/validations/src/job-preference-validation";

// Create user job preference embedding
export async function createUserJobPreferenceEmbedding(
  userJobPreference: UpdateJobPreferencesSchemaType
) {
  // Input text for the OpenAI API
  const inputText =
    `Job Titles: ${userJobPreference.keywords?.join(", ") ?? ""}` +
    `Job Types: ${userJobPreference.jobTypes?.join(", ") ?? ""}` +
    `Locations: ${userJobPreference.location?.join(", ") ?? ""}` +
    `Remote: ${userJobPreference.remote ? "Yes" : "No"}` +
    `Skills: ${userJobPreference.skills?.join(", ") ?? ""}`;

  // Truncate the input text to 2048 characters
  const truncatedText = inputText.slice(0, 8000);

  // Create the user job preference embedding
  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small", // Use the text-embedding-3-small model
      input: truncatedText, // Input text
    });

    console.log("User job preference embedding created.");

    // Return the embedding
    return embedding.data[0]?.embedding;
  } catch (error) {
    console.error("Error creating user job preference embedding", error);
    throw new Error("Error creating user job preference embedding");
  }
}

import { connectRabbitMQ } from "@repo/rabbitmq";
import { SelectJob } from "@repo/db/schema";

// Queue name
export const QUEUE_NAME = "jobQueue";

// BATCH_SIZE: Number of jobs to send to the queue
const BATCH_SIZE = 20;

// Producer function to send jobs to the queue
export const sendJobsToQueue = async (jobs: SelectJob[]): Promise<void> => {
  try {
    // Get the channel and connection
    const { channel, connection } = await connectRabbitMQ();

    // Assert the queue
    await channel.assertQueue(QUEUE_NAME, { durable: true }); // Make sure the queue is durable

    // Send jobs to the queue in batches
    for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
      // Get a batch of jobs
      const batch = jobs.slice(i, i + BATCH_SIZE);

      // Convert the batch to a buffer
      const data = Buffer.from(JSON.stringify(batch));

      // Send the batch to the queue
      channel.sendToQueue(QUEUE_NAME, data, { persistent: true });
      console.log(`
        #########################################
        📤 SENT BATCH TO QUEUE (${batch.length} jobs)
        #########################################
        `);
    }

    // Close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("❌ Failed to send jobs to RabbitMQ:", error);
  }
};

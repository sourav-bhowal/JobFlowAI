ALTER TABLE "job_preferences" ALTER COLUMN "keywords" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "job_preferences" ALTER COLUMN "location" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "job_preferences" ALTER COLUMN "skills" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "job_preferences" ALTER COLUMN "remote" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "job_preferences" ALTER COLUMN "jobTypes" DROP NOT NULL;
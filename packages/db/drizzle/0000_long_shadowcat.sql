CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE "public"."JobType" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');--> statement-breakpoint
CREATE TABLE "job_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"keywords" text[] NOT NULL,
	"location" text[] NOT NULL,
	"skills" text[] NOT NULL,
	"remote" boolean,
	"jobTypes" "JobType"[] NOT NULL,
	"vector" vector(1536),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "job_preferences_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"companyName" text,
	"companyLink" text,
	"jobType" text,
	"responsibilities" text[] DEFAULT '{}',
	"skills" text[] DEFAULT '{}',
	"tags" text[] DEFAULT '{}',
	"benefits" text[] DEFAULT '{}',
	"currency" text,
	"salaryFrequency" text,
	"minSalary" integer,
	"maxSalary" integer,
	"remote" boolean DEFAULT false,
	"location" text,
	"description" text,
	"insights" text,
	"link" text,
	"applyLink" text,
	"applyBy" timestamp,
	"postedAt" timestamp,
	"vector" vector(1536),
	"company" text,
	"experience" text,
	"salary" text,
	"logo" text,
	"jobLink" text,
	"openings" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"emailVerified" boolean DEFAULT false,
	"firstName" text,
	"lastName" text,
	"avatar" text,
	"bio" text,
	"city" text,
	"state" text,
	"country" text,
	"website" text,
	"resume" text,
	"linkedIn" text,
	"gitHub" text,
	"twitter" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "job_preferences" ADD CONSTRAINT "job_preferences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
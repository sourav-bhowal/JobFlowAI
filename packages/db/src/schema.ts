import {
  pgTable,
  text,
  boolean,
  timestamp,
  serial,
  integer,
  vector,
  uuid,
} from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import {
  type InferSelectModel,
  type InferInsertModel,
  relations,
} from "drizzle-orm";

// Enum for job types
const JobTypeEnum = pgEnum("JobType", [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
]);

// User table
export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  emailVerified: boolean("emailVerified").default(false),

  firstName: text("firstName"),
  lastName: text("lastName"),
  avatar: text("avatar"),
  bio: text("bio"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  website: text("website"),
  resume: text("resume"),
  linkedIn: text("linkedIn"),
  gitHub: text("gitHub"),
  twitter: text("twitter"),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  jobPreferences: one(jobPreferences, {
    fields: [users.id],
    references: [jobPreferences.userId],
  }),
}));

export const jobPreferences = pgTable("job_preferences", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid("userId")
    .unique()
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  keywords: text("keywords").array(),
  location: text("location").array(),
  skills: text("skills").array(),
  remote: boolean("remote").default(false),
  jobTypes: JobTypeEnum("jobTypes").array(),
  vector: vector("vector", { dimensions: 1536 }),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const jobPreferencesRelations = relations(jobPreferences, ({ one }) => ({
  user: one(users, {
    fields: [jobPreferences.userId],
    references: [users.id],
  }),
}));

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyName: text("companyName"),
  companyLink: text("companyLink"),
  jobType: text("jobType"),
  responsibilities: text("responsibilities").array().default([]),
  skills: text("skills").array().default([]),
  tags: text("tags").array().default([]),
  benefits: text("benefits").array().default([]),
  currency: text("currency"),
  salaryFrequency: text("salaryFrequency"),
  minSalary: integer("minSalary"),
  maxSalary: integer("maxSalary"),
  remote: boolean("remote").default(false),
  location: text("location"),
  description: text("description"),
  insights: text("insights"),
  link: text("link"),
  applyLink: text("applyLink"),
  applyBy: text("applyBy"),
  postedAt: text("postedAt"),
  vector: vector("vector", { dimensions: 1536 }),
  company: text("company"),
  experience: text("experience"),
  salary: text("salary"),
  logo: text("logo"),
  jobLink: text("jobLink"),
  openings: text("openings"),

  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type JobType = (typeof JobTypeEnum.enumValues)[number];

export type SelectUserWithJobPreferences = InferSelectModel<typeof users> & {
  jobPreferences: SelectJobPreferences;
};

export type InsertUser = InferInsertModel<typeof users>;
export type SelectJob = InferSelectModel<typeof jobs>;
export type InsertJob = InferInsertModel<typeof jobs>;
export type SelectJobPreferences = InferSelectModel<typeof jobPreferences>;
export type InsertJobPreferences = InferInsertModel<typeof jobPreferences>;

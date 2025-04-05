import { PrismaClient, Prisma } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma: ReturnType<typeof prismaClientSingleton> =
  globalThis.prismaGlobal ?? prismaClientSingleton();

// Ensure that the Prisma Client is not initialized multiple times
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// Get User Data
export function getUserData() {
  return {
    id: true,
    username: true,
    firstName: true,
    lastName: true,
    avatar: true,
    email: true,
    bio: true,
    city: true,
    state: true,
    country: true,
    website: true,
    resume: true,
    linkedIn: true,
    gitHub: true,
    twitter: true,
    createdAt: true,
    updatedAt: true,
    jobPreferences: true,
  } satisfies Prisma.UserSelect;
}

// Type for User Data
export type UserDataType = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserData>;
}>;

// Get user Job Preferences
export function getUserJobPreferences() {
  return {
    id: true,
    user: {
      select: getUserData(),
    },
    jobTypes: true,
    remote: true,
    location: true,
    keywords: true,
  } satisfies Prisma.JobPreferencesSelect;
}

// Type for User Job Preferences
export type UserJobPreferencesType = Prisma.JobPreferencesGetPayload<{
  select: ReturnType<typeof getUserJobPreferences>;
}>;


import { db } from "@repo/db/drizzle";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SelectUserWithJobPreferences } from "@repo/db/schema";
import { auth } from "./auth";
import { User } from "next-auth";

// Fetch User Data from cache
export const fetchUser = cache(
  async (): Promise<SelectUserWithJobPreferences> => {
    // Get session from auth
    const session = await auth();

    // Get logged in user
    const loggedInUser = session?.user as User;

    // Get user data from database
    const user = await db.query.users.findFirst({
      where: (user, { eq }) =>
        eq(user.username, loggedInUser.username as string),
      with: {
        jobPreferences: true,
      },
    });

    // if user not found
    if (!user) notFound();

    // return user
    return user;
  }
);

import prisma, { getUserData } from "@repo/database/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

// Fetch User Data from cache
export const fetchUser = cache(async (username: string) => {
  // get user data from database
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserData(),
  });

  // if user not found
  if (!user) notFound();
  
  // return user
  return user;
});

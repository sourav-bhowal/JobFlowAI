"use server";
// import {
//   UpdateUserSchemaType,
//   updateUserSchema,
//   resetPasswordSchema,
//   ResetPasswordSchemaType,
// } from "@repo/validations/src/user-validation";
import {
  updateJobPreferencesSchema,
  UpdateJobPreferencesSchemaType,
} from "@repo/validations/src/job-preference-validation";
import { auth } from "@/src/utils/auth";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@repo/email";
import {
  signUpSchema,
  SignUpSchemaType,
} from "@repo/validations/src/auth-validation";
import { createUserJobPreferenceEmbedding } from "@/src/utils/UserJobPreferenceEmbedding";
import { db } from "@repo/db/drizzle";
import { jobPreferences, users } from "@repo/db/schema";
import { User } from "next-auth";

// Sign up a new user server action
export async function signUpUserAction(values: SignUpSchemaType): Promise<{
  error: string;
}> {
  // Parse the values using the SignUp schema
  const { username, email, password } = signUpSchema.parse(values);

  // Check if the user already exists
  const existingUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  // If user already exists, return an error
  if (existingUser) {
    return { error: "User already exists" };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const [newUser] = await db
    .insert(users)
    .values({
      username,
      email,
      password: hashedPassword,
    })
    .returning();

  // If user is not created, return an error
  if (!newUser) {
    return { error: "User could not be created" };
  }

  // Send a welcome mail
  await sendWelcomeEmail({
    email: newUser.email,
    username: newUser.username,
  });

  // Return empty error message
  return { error: "" };
}

// Update user profile server action
// export async function updateUserProfileAction(
//   values: UpdateUserSchemaType
// ): Promise<UserDataType> {
//   // Parse the values using the UpdateUser schema
//   const {
//     username,
//     lastName,
//     firstName,
//     bio,
//     city,
//     state,
//     country,
//     website,
//     resume,
//     linkedIn,
//     gitHub,
//     twitter,
//   } = updateUserSchema.parse(values);

//   // Get the session
//   const session = await auth();

//   // Get the user from the session
//   const user = session?.user;

//   // If user is not found, return an error
//   if (!user) throw new Error("User not found");

//   // Update the user
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       username,
//       lastName,
//       firstName,
//       bio,
//       city,
//       state,
//       country,
//       website,
//       resume,
//       linkedIn,
//       gitHub,
//       twitter,
//     },
//     select: getUserData(), // Select the fields to return
//   });

//   // If user is not updated, return an error
//   if (!updatedUser) throw new Error("User not updated");

//   // Return the updated user
//   return updatedUser;
// }

// // Reset user password server action
// export async function resetUserPasswordAction(
//   values: ResetPasswordSchemaType
// ): Promise<{ message: string }> {
//   // Parse the values using the ResetPassword schema
//   const { oldPassword, newPassword } = resetPasswordSchema.parse(values);

//   // Get the session
//   const session = await auth();

//   // Get the user from the session
//   const user = session?.user;

//   // If user is not found, return an error
//   if (!user) throw new Error("User not found");

//   // Get the user from the database
//   const dbUser = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//   });

//   // If user is not found, return an error
//   if (!dbUser) throw new Error("User not found");

//   // Check if the old password is correct
//   const isOldPasswordCorrect = await bcrypt.compare(
//     oldPassword,
//     dbUser.password
//   );

//   // If the old password is incorrect, return an error
//   if (!isOldPasswordCorrect) throw new Error("Incorrect old password");

//   // Hash the new password
//   const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//   // Update the user password
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       password: hashedNewPassword,
//     },
//     select: getUserData(),
//   });

//   // If user is not updated, return an error
//   if (!updatedUser) throw new Error("User not updated");

//   // Return a success message
//   return { message: "Password updated successfully" };
// }

// Update User Job Preference server action
export async function updateUserJobPreferenceAction(
  values: UpdateJobPreferencesSchemaType
): Promise<{
  error: string;
}> {
  // Parse the values using the UpdateJobPreferences schema
  const { jobTypes, remote, keywords, location, skills } =
    updateJobPreferencesSchema.parse(values);

  // Get the session
  const session = await auth();

  // Get the user from the session
  const user = session?.user as User;

  // If user is not found, return an error
  if (!user) {
    return { error: "User not found" };
  }

  // Create the user job preference embedding
  const userJobPreferenceEmbedding =
    await createUserJobPreferenceEmbedding(values);

  // Upsert the user job preferences so that it creates a new record if it doesn't exist
  const [updatedJobPreferences] = await db
    .insert(jobPreferences)
    .values({
      userId: user.id as string,
      jobTypes,
      remote,
      keywords,
      location,
      skills,
      vector: userJobPreferenceEmbedding,
    })
    .onConflictDoUpdate({
      target: jobPreferences.userId,
      set: {
        jobTypes,
        remote,
        keywords,
        location,
        skills,
        vector: userJobPreferenceEmbedding,
      },
    })
    .returning();

  // If job preferences are not updated, return an error
  if (!updatedJobPreferences) {
    return { error: "Job preferences not updated" };
  }

  // Empty error message
  return { error: "" };
}

// // Delete user account server action
// export async function deleteUserAccountAction(): Promise<{ message: string }> {
//   // Get the session
//   const session = await auth();

//   // Get the user from the session
//   const user = session?.user;

//   // If user is not found, return an error
//   if (!user) throw new Error("User not found");

//   // Delete the user
//   const deletedUser = await prisma.user.delete({
//     where: {
//       id: user.id,
//     },
//   });

//   // If user is not deleted, return an error
//   if (!deletedUser) throw new Error("User not deleted");

//   // Return a success message
//   return { message: "User account deleted successfully" };
// }

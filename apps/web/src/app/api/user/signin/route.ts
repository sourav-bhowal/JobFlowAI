import { db } from "@repo/db/drizzle";
import { signInSchema } from "@repo/validations/src/auth-validation";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // Parse the values using the SignIn schema
    const { email, password } = signInSchema.parse(await request.json());

    // Check if the user exists
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    // If user does not exist, return an error
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return an error
    if (!passwordMatch) {
      return Response.json(
        { error: "Password does not match" },
        { status: 401 }
      );
    }

    // Return the user
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in sign-in route:", error);
    // Handle error
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

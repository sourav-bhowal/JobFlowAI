import { z } from "zod";

// SignUp validation schema
export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .trim(),
});

// Type of SignUp schema
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

// SignIn validation schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .trim(),
});

// Type of SignIn schema
export type SignInSchemaType = z.infer<typeof signInSchema>;

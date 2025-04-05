import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "@repo/validations/src/auth-validation";
import bcrypt from "bcrypt";
import prisma from "@repo/database/prisma";

// NextAuth configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Providers are defined here
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      // The authorize method is used to check credentials
      async authorize(credentials: any): Promise<any> {
        try {
          // Parse the values using the SignIn schema
          const { email, password } = signInSchema.parse(credentials);

          // Check if the user exists
          const user = await prisma.user.findUnique({ where: { email } });

          // If user does not exist, return an error
          if (!user) {
            return { error: "User not found" };
          }

          // Compare the password
          const passwordMatch = await bcrypt.compare(password, user.password);

          // If password does not match, return an error
          if (!passwordMatch) {
            return { error: "Password does not match" };
          }

          // Return the user
          return user;
        } catch (error) {
          // Return the error
          return { error: "An unexpected error occurred. Please try again." };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.AUTH_SECRET,
});

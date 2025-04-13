import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.AUTH_URL}/api/user/signin`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Check if the response is ok
          const data = await response.json();

          // Get the user from the response
          const user = data.user;

          // If user found and response is ok, return the user
          if (user) {
            return user;
          }

          // If user not found, return null
          return null;
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

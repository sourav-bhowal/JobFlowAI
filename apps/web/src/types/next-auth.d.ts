import "next-auth";

// Change the shape of the session object
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
      email?: string;
    } & DefaultSession["user"];
  }

  // Add custom properties to the user object
  interface User {
    id?: string;
    username?: string;
    email?: string;
  }
}

// Change the shape of the JWT object
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id?: string;
      username?: string;
      email?: string;
    };
  }
}

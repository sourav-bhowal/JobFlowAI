import { auth } from "@/src/utils/auth";

// Middleware to handle authentication and redirection
export default auth((req) => {
  // Check if the user is authenticated
  if (
    !req.auth &&
    (req.nextUrl.pathname.startsWith("/user") ||
      req.nextUrl.pathname.startsWith("/jobs"))
  ) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  // If the user is authenticated and trying to access the sign-in or sign-up page, redirect them to the profile page
  if (
    req.auth &&
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup"))
  ) {
    const newUrl = new URL("/user/profile", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Match
export const config = {
  matcher: ["/signin", "/signup", "/", "/jobs/:path*", "/user/:path*"],
};

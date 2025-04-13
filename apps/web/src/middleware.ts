import { auth } from "@/src/utils/auth";

export default auth((req) => {
  console.log("Middleware running...");
  console.log("Request URL:", req.nextUrl.pathname);

  if (
    !req.auth &&
    (req.nextUrl.pathname.startsWith("/user") ||
      req.nextUrl.pathname.startsWith("/jobs"))
  ) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup") ||
      req.nextUrl.pathname === "/")
  ) {
    const newUrl = new URL("/user/profile", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/signin", "/signup", "/", "/jobs/:path*", "/user/:path*"],
};

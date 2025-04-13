import { auth } from "@/src/app/api/auth/[...nextauth]/auth";

export default auth((req) => {
  console.log("Middleware running...");
  console.log("Request URL:", req.nextUrl.pathname);
  if (!req.auth) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup"))
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/signin", "/signup", "/", "/jobs/:path*", "/user/:path*"],
};

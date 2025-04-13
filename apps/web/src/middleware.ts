import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// Middleware to protect routes
export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: "secret123",
  });

  console.log("Token:", token);
  console.log("Request URL:", request.url);
  console.log("Request cookies:", request.cookies);

  // Get the URL from the request
  const url = request.nextUrl;

  // If the token exists and the user is trying to access the sign-in or sign-up page, redirect to the home page
  if (
    token &&
    (url.pathname.startsWith("/signin") || url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the token does not exist and the user is trying to access a protected route, redirect to the sign-in page
  if (
    !token &&
    (url.pathname.startsWith("/user") || url.pathname.startsWith("/jobs"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Pass on the request if the user is authenticated or accessing public routes
  return NextResponse.next();
}

// This middleware is used to protect the routes that require authentication
export const config = {
  matcher: ["/user/:path*", "/signin", "/signup", "/", "/jobs/:path*"],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Unauthenticated
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    // Authenticated
    const userEmail = token.email;
    if (userEmail?.split("@")[1] === "student.chula.ac.th") {
      // As Student
      if (path.startsWith("/jobs")) {
        return NextResponse.redirect(new URL("/landing", req.url));
      }
    } else {
      // As Employer
      if (path.startsWith("/search")) {
        return NextResponse.redirect(new URL("/landing", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export const config = { matcher: ["/search/:path*", "/jobs/:path*"] };

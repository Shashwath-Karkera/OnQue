import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "oncue_session";

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "oncue_default_enterprise_session_key_32_chars_minimum_dev";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  let isValidSession = false;
  if (token) {
    try {
      const secret = getJwtSecret();
      await jwtVerify(token, secret);
      isValidSession = true;
    } catch {
      isValidSession = false;
    }
  }

  // 1. Guard /app/* routes: Redirect unauthenticated visitors to /login
  if (pathname.startsWith("/app")) {
    if (!isValidSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Redirect logged-in users away from /login or /register directly to dashboard
  if (pathname === "/login" || pathname === "/register") {
    if (isValidSession) {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/register"],
};

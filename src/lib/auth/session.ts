import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "oncue_session";
const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar_url?: string | null;
  auth_provider: "email" | "google";
}

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "oncue_default_enterprise_session_key_32_chars_minimum_dev";
  return new TextEncoder().encode(secret);
}

/**
 * Creates a cryptographically signed JWT session token.
 */
export async function createSessionToken(user: SessionUser): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secret);
}

/**
 * Verifies and decodes a session JWT token. Returns null if expired or invalid.
 */
export async function verifySessionToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return (payload.user as SessionUser) || null;
  } catch {
    return null;
  }
}

/**
 * Attaches the secure session cookie to a Next.js NextResponse.
 */
export function setSessionCookie(response: NextResponse, token: string) {
  const isProduction = process.env.NODE_ENV === "production";
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

/**
 * Clears the session cookie on logout.
 */
export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Extracts the current session user in Server Components and Route Handlers.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;
    return verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}

/**
 * Extracts the current session user from a NextRequest in middleware.
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<SessionUser | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

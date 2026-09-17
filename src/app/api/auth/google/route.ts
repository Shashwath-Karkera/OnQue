import { NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";
import {
  findUserByEmail,
  createUser,
  upsertGoogleUser,
  writeAuditLog,
} from "@/lib/auth/user-store";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

// Google's public JSON Web Key Set for Firebase Auth tokens
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    const { idToken, action = "login" } = await request.json().catch(() => ({}));

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid Google ID token is required." },
        { status: 400 }
      );
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Authentication is not configured on the server.",
        },
        { status: 500 }
      );
    }

    let email = "";
    let name = "";
    let avatarUrl: string | undefined = undefined;

    try {
      const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
        issuer: `https://securetoken.google.com/${projectId}`,
        audience: projectId,
      });

      email = (payload.email as string) || "";
      name =
        (payload.name as string) ||
        (email ? email.split("@")[0] : "Google User");
      avatarUrl = (payload.picture as string) || undefined;
    } catch (err: any) {
      console.error("[Google Token Verification Error]", err.message);
      return NextResponse.json(
        {
          success: false,
          error: "Google authentication token could not be verified.",
        },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not retrieve email from Google Account.",
        },
        { status: 400 }
      );
    }

    const existingUser = await findUserByEmail(email);

    // =========================================================================
    // 1. REGISTRATION FLOW (mode: "register")
    // =========================================================================
    if (action === "register") {
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error:
              "An account with this Google email already exists. Please sign in instead.",
          },
          { status: 409 }
        );
      }

      // Create new user in NeonDB
      const newUser = await createUser({
        email,
        name,
        auth_provider: "google",
        avatar_url: avatarUrl,
        is_verified: true,
        role: "contractor",
      });

      await writeAuditLog({
        userId: newUser.id,
        email: newUser.email,
        eventType: "GOOGLE_REGISTER_SUCCESS",
        ipAddress: ip,
        userAgent,
      });

      // DO NOT set session cookie! Compulsory login required before accessing dashboard
      return NextResponse.json({
        success: true,
        requiresLogin: true,
        message:
          "Account registered successfully! Please sign in with Google to access your dashboard.",
      });
    }

    // =========================================================================
    // 2. LOGIN FLOW (mode: "login")
    // =========================================================================
    if (!existingUser) {
      await writeAuditLog({
        email,
        eventType: "GOOGLE_LOGIN_FAILED_NOT_REGISTERED",
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "No account found with this Google email. Please register first.",
        },
        { status: 404 }
      );
    }

    // Check account lockout
    if (
      existingUser.locked_until &&
      new Date(existingUser.locked_until) > new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Account temporarily locked due to excessive failed attempts. Please try again later.",
        },
        { status: 423 }
      );
    }

    // Update user info and ensure is_verified
    const user = await upsertGoogleUser({
      email,
      name,
      avatar_url: avatarUrl,
    });

    // Issue Session Token & Set HttpOnly Cookie
    const sessionToken = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: user.auth_provider,
    });

    const response = NextResponse.json({
      success: true,
      message: "Google authentication successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar_url: user.avatar_url,
      },
    });

    setSessionCookie(response, sessionToken);

    await writeAuditLog({
      userId: user.id,
      email: user.email,
      eventType: "GOOGLE_LOGIN_SUCCESS",
      ipAddress: ip,
      userAgent,
    });

    return response;
  } catch (error: any) {
    console.error("[Google Sign-In API Error]", error);
    return NextResponse.json(
      { success: false, error: "Google authentication failed." },
      { status: 500 }
    );
  }
}

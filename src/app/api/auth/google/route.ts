import { NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { upsertGoogleUser, writeAuditLog } from "@/lib/auth/user-store";
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

    const { idToken } = await request.json().catch(() => ({}));

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid Google ID token is required." },
        { status: 400 }
      );
    }

    let email = "";
    let name = "";
    let avatarUrl: string | undefined = undefined;

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

    try {
      const { payload } = await jwtVerify(idToken, GOOGLE_JWKS, {
        issuer: `https://securetoken.google.com/${projectId}`,
        audience: projectId,
      });

      email = (payload.email as string) || "";
      name = (payload.name as string) || "Google User";
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

    // 2. Upsert user in NeonDB
    const user = await upsertGoogleUser({
      email,
      name,
      avatar_url: avatarUrl,
    });

    // 3. Issue Session Token & Set HttpOnly Cookie
    const sessionToken = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar_url: user.avatar_url,
      auth_provider: "google",
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

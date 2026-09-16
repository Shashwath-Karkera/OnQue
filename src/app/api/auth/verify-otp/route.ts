import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/auth/security";
import {
  findUserByEmail,
  createUser,
  verifyAndBurnOtp,
  writeAuditLog,
} from "@/lib/auth/user-store";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

const VerifyOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  otp: z.string().length(6, "Verification code must be exactly 6 digits").regex(/^\d+$/, "Code must be numeric"),
  purpose: z.enum(["register", "login", "reset_password"]).default("register"),
});

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    // 1. Rate limiting: Max 10 verification requests per 5 minutes per IP
    const rateLimit = checkRateLimit(`verify_ip_${ip}`, 10, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many verification attempts. Please wait ${rateLimit.resetSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const json = await request.json().catch(() => ({}));
    const parseResult = VerifyOtpSchema.safeParse(json);

    if (!parseResult.success) {
      const errorMsg =
        parseResult.error.issues[0]?.message || "Invalid verification payload";
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const { email, otp, purpose } = parseResult.data;

    // 2. Validate and Burn OTP against NeonDB
    const verification = await verifyAndBurnOtp({
      email,
      rawOtp: otp,
      purpose,
    });

    if (!verification.valid) {
      await writeAuditLog({
        email,
        eventType: "OTP_FAILED",
        ipAddress: ip,
        userAgent,
        metadata: { error: verification.error },
      });

      return NextResponse.json(
        { success: false, error: verification.error || "Invalid code" },
        { status: 400 }
      );
    }

    // 3. Complete user creation or activation
    let user = await findUserByEmail(email);

    if (!user) {
      if (!verification.pendingPayload) {
        return NextResponse.json(
          {
            success: false,
            error: "Registration session expired. Please register again.",
          },
          { status: 400 }
        );
      }

      user = await createUser({
        email,
        name: verification.pendingPayload.name,
        password_hash: verification.pendingPayload.password_hash,
        auth_provider: "email",
        is_verified: true,
      });
    }

    // 4. Do not auto-login upon registration OTP verification; user must explicitly sign in
    await writeAuditLog({
      userId: user.id,
      email: user.email,
      eventType: "OTP_VERIFIED",
      ipAddress: ip,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      requiresLogin: true,
      message: "Account verified successfully! Please sign in with your email and password.",
      email: user.email,
    });
  } catch (error: any) {
    console.error("[Verify OTP API Error]", error);
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}

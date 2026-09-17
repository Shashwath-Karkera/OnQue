import { NextResponse } from "next/server";
import { z } from "zod";
import {
  hashPassword,
  generateOtp,
  checkRateLimit,
  evaluatePasswordStrength,
} from "@/lib/auth/security";
import {
  findUserByEmail,
  saveOtp,
  writeAuditLog,
} from "@/lib/auth/user-store";
import { sendOtpEmail } from "@/lib/email/mailer";

const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(255)
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password is too long"),
});

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    // 1. Rate Limiting: Max 5 registration attempts per 10 minutes per IP
    const rateLimit = checkRateLimit(`reg_ip_${ip}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many registration attempts. Please try again in ${rateLimit.resetSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const json = await request.json().catch(() => ({}));
    const parseResult = RegisterSchema.safeParse(json);

    if (!parseResult.success) {
      const firstError =
        parseResult.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, password } = parseResult.data;

    // 2. Strong Password Verification
    const passwordStrength = evaluatePasswordStrength(password);
    if (!passwordStrength.isValid) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Password must contain at least 8 characters, including uppercase, lowercase, and numbers.",
        },
        { status: 400 }
      );
    }

    // 3. Check for existing active user
    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.is_verified) {
      return NextResponse.json(
        {
          success: false,
          error: "An account with this email already exists. Please sign in.",
        },
        { status: 409 }
      );
    }

    // 4. Hash password and generate cryptographically secure 6-digit OTP
    const passwordHash = await hashPassword(password);
    const otp = generateOtp();

    // 5. Store hashed OTP in NeonDB with pending user details
    await saveOtp({
      email,
      rawOtp: otp,
      purpose: "register",
      pendingPayload: {
        name,
        password_hash: passwordHash,
      },
    });

    // 6. Send verification code via SMTP email (or dev console fallback)
    const emailResult = await sendOtpEmail(email, otp, name);

    // 7. Audit log
    await writeAuditLog({
      email,
      eventType: "OTP_SENT_REGISTER",
      ipAddress: ip,
      userAgent,
      metadata: { devMode: emailResult.devMode },
    });

    return NextResponse.json({
      success: true,
      message: `A 6-digit verification code has been sent to ${email}.`,
      email,
    });
  } catch (error: any) {
    console.error("[Register API Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

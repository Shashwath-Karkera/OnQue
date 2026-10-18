import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, generateOtp } from "@/lib/auth/security";
import { saveOtp, findUserByEmail, writeAuditLog } from "@/lib/auth/user-store";
import { sendOtpEmail } from "@/lib/email/mailer";
import { query, isDatabaseConfigured } from "@/lib/db/neon";

const ResendOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  purpose: z.enum(["register", "login", "reset_password"]).default("register"),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    const json = await request.json().catch(() => ({}));
    const parseResult = ResendOtpSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const { email, purpose, name: passedName } = parseResult.data;

    // Strict cooldown: Only 1 resend per 60 seconds per email
    const cooldown = checkRateLimit(`resend_cd_${email}`, 1, 60 * 1000);
    if (!cooldown.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${cooldown.resetSeconds} seconds before requesting another code.`,
        },
        { status: 429 }
      );
    }

    // Generate new OTP
    const newOtp = generateOtp();
    let recipientName = passedName;
    let pendingPayload: { name: string; password_hash: string } | undefined = undefined;

    // Check existing registered user
    const user = await findUserByEmail(email);
    if (user?.name) {
      recipientName = user.name;
    }

    // If pending registration, preserve pending payload and extract recipient name
    if (isDatabaseConfigured()) {
      try {
        const existingOtp = await query(
          `SELECT pending_payload FROM otps WHERE LOWER(email) = $1 AND purpose = $2 AND pending_payload IS NOT NULL ORDER BY created_at DESC LIMIT 1`,
          [email, purpose]
        );
        if (existingOtp.rows.length > 0 && existingOtp.rows[0].pending_payload) {
          pendingPayload = existingOtp.rows[0].pending_payload;
          if (!recipientName && pendingPayload?.name) {
            recipientName = pendingPayload.name;
          }
        }
      } catch (err) {
        console.error("[Resend OTP error reading pending_payload]", err);
      }
    }

    await saveOtp({
      email,
      rawOtp: newOtp,
      purpose,
      pendingPayload,
    });

    const emailResult = await sendOtpEmail(
      email,
      newOtp,
      recipientName
    );

    await writeAuditLog({
      email,
      eventType: "OTP_RESENT",
      ipAddress: ip,
      userAgent,
      metadata: { devMode: emailResult.devMode },
    });

    return NextResponse.json({
      success: true,
      message: `A new verification code has been dispatched to ${email}.`,
    });
  } catch (error: any) {
    console.error("[Resend OTP API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to resend code. Please try again." },
      { status: 500 }
    );
  }
}

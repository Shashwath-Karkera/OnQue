import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, generateOtp } from "@/lib/auth/security";
import { saveOtp, findUserByEmail, writeAuditLog } from "@/lib/auth/user-store";
import { sendOtpEmail } from "@/lib/email/mailer";

const ResendOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  purpose: z.enum(["register", "login", "reset_password"]).default("register"),
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

    const { email, purpose } = parseResult.data;

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
    const user = await findUserByEmail(email);

    await saveOtp({
      email,
      rawOtp: newOtp,
      purpose,
    });

    const emailResult = await sendOtpEmail(
      email,
      newOtp,
      user?.name || "Valued Member"
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

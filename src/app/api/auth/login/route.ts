import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, checkRateLimit, generateOtp } from "@/lib/auth/security";
import {
  findUserByEmail,
  recordFailedLogin,
  resetFailedLogin,
  saveOtp,
  writeAuditLog,
} from "@/lib/auth/user-store";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { sendOtpEmail } from "@/lib/email/mailer";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "";

    // 1. Rate Limiting: Max 10 login attempts per 5 minutes per IP
    const rateLimit = checkRateLimit(`login_ip_${ip}`, 10, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please try again in ${rateLimit.resetSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const json = await request.json().catch(() => ({}));
    const parseResult = LoginSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.issues[0]?.message || "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    // 2. Fetch User
    const user = await findUserByEmail(email);

    // 3. Check for Temporary Brute-Force Lockout
    if (user?.locked_until) {
      const lockExpiry = new Date(user.locked_until).getTime();
      const now = Date.now();
      if (lockExpiry > now) {
        const remainingMinutes = Math.ceil((lockExpiry - now) / (60 * 1000));
        await writeAuditLog({
          userId: user.id,
          email,
          eventType: "LOGIN_REJECTED_LOCKED",
          ipAddress: ip,
          userAgent,
        });

        return NextResponse.json(
          {
            success: false,
            error: `Account is temporarily locked due to excessive failed attempts. Please retry in ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}.`,
          },
          { status: 423 }
        );
      }
    }

    // 4. Check if user is a Google OAuth account with no password set
    if (user && user.auth_provider === "google" && !user.password_hash) {
      return NextResponse.json(
        {
          success: false,
          error:
            "This account was registered with Google. Please click 'Continue with Google' to sign in.",
        },
        { status: 400 }
      );
    }

    // 5. Verify Password
    const hasValidPassword =
      user && user.password_hash
        ? await verifyPassword(password, user.password_hash)
        : false;

    if (!user || !hasValidPassword) {
      // Record failed attempt for existing user
      let lockoutWarning = "";
      if (user) {
        const failedInfo = await recordFailedLogin(email);
        if (failedInfo.isLocked) {
          lockoutWarning = " Account is now locked for 15 minutes.";
        } else if (failedInfo.attempts >= 3) {
          lockoutWarning = ` Warning: ${5 - failedInfo.attempts} attempts remaining before temporary lockout.`;
        }
      }

      await writeAuditLog({
        userId: user?.id,
        email,
        eventType: "LOGIN_FAILED",
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        {
          success: false,
          error: `Invalid email or password.${lockoutWarning}`,
        },
        { status: 401 }
      );
    }

    // 5. Check if user completed OTP verification
    if (!user.is_verified) {
      const otp = generateOtp();
      await saveOtp({ email, rawOtp: otp, purpose: "register" });
      await sendOtpEmail(email, otp, user.name);

      return NextResponse.json(
        {
          success: false,
          requiresVerification: true,
          email: user.email,
          message:
            "Your email is not verified yet. A verification code has been dispatched to your email.",
        },
        { status: 403 }
      );
    }

    // 6. Successful Login: Clear any failed login counters
    await resetFailedLogin(email);

    // 7. Issue Session Token & Set HttpOnly Cookie
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
      message: "Authentication successful",
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
      eventType: "LOGIN_SUCCESS",
      ipAddress: ip,
      userAgent,
    });

    return response;
  } catch (error: any) {
    console.error("[Login API Error]", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}

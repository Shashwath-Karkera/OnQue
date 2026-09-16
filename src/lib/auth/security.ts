import bcrypt from "bcryptjs";
import crypto from "crypto";

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hash password securely with bcrypt (12 rounds)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Verify a plaintext password against a stored bcrypt hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a cryptographically secure 6-digit OTP
 */
export function generateOtp(): string {
  // Generates integer in range [100000, 999999]
  const num = crypto.randomInt(100000, 1000000);
  return num.toString();
}

/**
 * Hash the OTP using SHA-256 before storing in database.
 * Even if database is accessed, raw OTPs cannot be viewed.
 */
export function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp.trim()).digest("hex");
}

/**
 * Timing-safe comparison of OTP hashes to prevent timing-attack analysis.
 */
export function verifyOtpHash(otp: string, storedHash: string): boolean {
  try {
    const computedHash = hashOtp(otp);
    const bufA = Buffer.from(computedHash, "hex");
    const bufB = Buffer.from(storedHash, "hex");

    if (bufA.length !== bufB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Password complexity evaluator
 */
export function evaluatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: "Too Weak" | "Fair" | "Good" | "Strong" | "Flawless";
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isValid: boolean;
} {
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasLength) score++;
  if (hasUpper && hasLower) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;

  const labels: Array<"Too Weak" | "Fair" | "Good" | "Strong" | "Flawless"> = [
    "Too Weak",
    "Fair",
    "Good",
    "Strong",
    "Flawless",
  ];

  return {
    score,
    label: labels[score],
    hasLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    isValid: hasLength && hasUpper && hasLower && hasNumber,
  };
}

// -----------------------------------------------------------------------------
// In-Memory Rate Limiter (Token Bucket / Sliding Window)
// Protects endpoints against flood attacks, brute-force OTP guessing, and credential stuffing
// -----------------------------------------------------------------------------
interface RateLimitRecord {
  count: number;
  firstRequest: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodically clean expired rate-limit records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now - record.firstRequest > 15 * 60 * 1000) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 60 * 1000
): {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now - record.firstRequest > windowMs) {
    rateLimitStore.set(identifier, { count: 1, firstRequest: now });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    const timeRemaining = Math.max(0, windowMs - (now - record.firstRequest));
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.ceil(timeRemaining / 1000),
    };
  }

  record.count += 1;
  const timeRemaining = Math.max(0, windowMs - (now - record.firstRequest));

  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    resetSeconds: Math.ceil(timeRemaining / 1000),
  };
}

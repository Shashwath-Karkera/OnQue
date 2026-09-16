import { query, isDatabaseConfigured } from "@/lib/db/neon";
import { hashOtp, verifyOtpHash } from "./security";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  password_hash?: string | null;
  auth_provider: "email" | "google";
  avatar_url?: string | null;
  company_name?: string | null;
  role: string;
  is_verified: boolean;
  failed_attempts: number;
  locked_until?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OtpRecord {
  id: string;
  email: string;
  otp_hash: string;
  purpose: string;
  attempts: number;
  expires_at: string;
  pending_payload?: {
    name: string;
    password_hash: string;
  } | null;
  created_at: string;
}

// Empty fallback store for edge cases
const devUsersStore = new Map<string, UserRecord>();
const devOtpsStore = new Map<string, OtpRecord>();

// -----------------------------------------------------------------------------
// USER OPERATIONS
// -----------------------------------------------------------------------------

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isDatabaseConfigured()) {
    try {
      const res = await query<UserRecord>(
        `SELECT * FROM users WHERE LOWER(email) = $1 LIMIT 1`,
        [normalizedEmail]
      );
      return res.rows[0] || null;
    } catch (err) {
      console.error("[NeonDB Error - findUserByEmail]", err);
      // Fallback to dev store if table not yet created
      return devUsersStore.get(normalizedEmail) || null;
    }
  }

  return devUsersStore.get(normalizedEmail) || null;
}

export async function createUser(data: {
  email: string;
  name: string;
  password_hash?: string | null;
  auth_provider: "email" | "google";
  avatar_url?: string | null;
  company_name?: string | null;
  role?: string;
  is_verified?: boolean;
}): Promise<UserRecord> {
  const normalizedEmail = data.email.trim().toLowerCase();

  if (isDatabaseConfigured()) {
    try {
      const res = await query<UserRecord>(
        `INSERT INTO users (email, name, password_hash, auth_provider, avatar_url, company_name, role, is_verified)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          normalizedEmail,
          data.name.trim(),
          data.password_hash || null,
          data.auth_provider,
          data.avatar_url || null,
          data.company_name || null,
          data.role || "contractor",
          data.is_verified ?? true,
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error("[NeonDB Error - createUser]", err);
    }
  }

  const newUser: UserRecord = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    email: normalizedEmail,
    name: data.name.trim(),
    password_hash: data.password_hash || null,
    auth_provider: data.auth_provider,
    avatar_url: data.avatar_url || null,
    company_name: data.company_name || null,
    role: data.role || "contractor",
    is_verified: data.is_verified ?? true,
    failed_attempts: 0,
    locked_until: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  devUsersStore.set(normalizedEmail, newUser);
  return newUser;
}

export async function upsertGoogleUser(data: {
  email: string;
  name: string;
  avatar_url?: string;
}): Promise<UserRecord> {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    if (isDatabaseConfigured()) {
      try {
        const res = await query<UserRecord>(
          `UPDATE users 
           SET name = $1, avatar_url = COALESCE($2, avatar_url), is_verified = TRUE, updated_at = NOW()
           WHERE id = $3
           RETURNING *`,
          [data.name, data.avatar_url || null, existing.id]
        );
        return res.rows[0];
      } catch (err) {
        console.error("[NeonDB Error - updateGoogleUser]", err);
      }
    }
    existing.name = data.name;
    existing.avatar_url = data.avatar_url || existing.avatar_url;
    existing.is_verified = true;
    return existing;
  }

  return createUser({
    email: data.email,
    name: data.name,
    auth_provider: "google",
    avatar_url: data.avatar_url,
    is_verified: true,
  });
}

export async function recordFailedLogin(email: string): Promise<{
  isLocked: boolean;
  attempts: number;
  lockedUntil?: Date;
}> {
  const user = await findUserByEmail(email);
  if (!user) return { isLocked: false, attempts: 0 };

  const newAttempts = (user.failed_attempts || 0) + 1;
  const isLocked = newAttempts >= 5;
  const lockedUntil = isLocked
    ? new Date(Date.now() + 15 * 60 * 1000) // 15-minute lockout
    : null;

  if (isDatabaseConfigured()) {
    try {
      await query(
        `UPDATE users
         SET failed_attempts = $1, locked_until = $2, updated_at = NOW()
         WHERE id = $3`,
        [newAttempts, lockedUntil ? lockedUntil.toISOString() : null, user.id]
      );
    } catch (err) {
      console.error("[NeonDB Error - recordFailedLogin]", err);
    }
  }

  user.failed_attempts = newAttempts;
  user.locked_until = lockedUntil ? lockedUntil.toISOString() : null;

  return {
    isLocked,
    attempts: newAttempts,
    lockedUntil: lockedUntil || undefined,
  };
}

export async function resetFailedLogin(email: string): Promise<void> {
  const user = await findUserByEmail(email);
  if (!user) return;

  if (isDatabaseConfigured()) {
    try {
      await query(
        `UPDATE users SET failed_attempts = 0, locked_until = NULL, updated_at = NOW() WHERE id = $1`,
        [user.id]
      );
    } catch (err) {
      console.error("[NeonDB Error - resetFailedLogin]", err);
    }
  }

  user.failed_attempts = 0;
  user.locked_until = null;
}

// -----------------------------------------------------------------------------
// OTP OPERATIONS
// -----------------------------------------------------------------------------

export async function saveOtp(data: {
  email: string;
  rawOtp: string;
  purpose: "register" | "login" | "reset_password";
  pendingPayload?: {
    name: string;
    password_hash: string;
  };
}): Promise<void> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const rawOtpCode = data.rawOtp.trim(); // Stored plain for fast dev copy-paste
  const expiresAt = new Date(Date.now() + 1 * 60 * 1000); // 1 minute expiry

  if (isDatabaseConfigured()) {
    try {
      // Remove any prior pending OTP for this email & purpose
      await query(`DELETE FROM otps WHERE LOWER(email) = $1 AND purpose = $2`, [
        normalizedEmail,
        data.purpose,
      ]);

      await query(
        `INSERT INTO otps (email, otp_hash, purpose, attempts, expires_at, pending_payload)
         VALUES ($1, $2, $3, 0, $4, $5)`,
        [
          normalizedEmail,
          rawOtpCode,
          data.purpose,
          expiresAt.toISOString(),
          data.pendingPayload ? JSON.stringify(data.pendingPayload) : null,
        ]
      );
      return;
    } catch (err) {
      console.error("[NeonDB Error - saveOtp]", err);
    }
  }

  // Dev in-memory store
  devOtpsStore.set(`${normalizedEmail}:${data.purpose}`, {
    id: `otp_${Date.now()}`,
    email: normalizedEmail,
    otp_hash: rawOtpCode,
    purpose: data.purpose,
    attempts: 0,
    expires_at: expiresAt.toISOString(),
    pending_payload: data.pendingPayload || null,
    created_at: new Date().toISOString(),
  });
}

export async function verifyAndBurnOtp(data: {
  email: string;
  rawOtp: string;
  purpose: "register" | "login" | "reset_password";
}): Promise<{
  valid: boolean;
  error?: string;
  pendingPayload?: { name: string; password_hash: string } | null;
}> {
  const normalizedEmail = data.email.trim().toLowerCase();
  const now = new Date();

  let otpRecord: OtpRecord | null = null;

  if (isDatabaseConfigured()) {
    try {
      const res = await query<OtpRecord>(
        `SELECT * FROM otps WHERE LOWER(email) = $1 AND purpose = $2 LIMIT 1`,
        [normalizedEmail, data.purpose]
      );
      otpRecord = res.rows[0] || null;
    } catch (err) {
      console.error("[NeonDB Error - getOtp]", err);
    }
  }

  if (!otpRecord) {
    otpRecord = devOtpsStore.get(`${normalizedEmail}:${data.purpose}`) || null;
  }

  if (!otpRecord) {
    return {
      valid: false,
      error: "No pending verification code found. Please request a new code.",
    };
  }

  // Check expiration (1 minute)
  if (new Date(otpRecord.expires_at) < now) {
    await deleteOtp(normalizedEmail, data.purpose);
    return {
      valid: false,
      error: "Verification code has expired (1 minute limit). Please request a new code.",
    };
  }

  // Check attempt limit
  if (otpRecord.attempts >= 5) {
    await deleteOtp(normalizedEmail, data.purpose);
    return {
      valid: false,
      error:
        "Too many incorrect attempts. For security, this code was invalidated. Please request a new code.",
    };
  }

  // Direct OTP comparison (allows raw OTP copy-paste from Neon table)
  const isMatch = data.rawOtp.trim() === otpRecord.otp_hash.trim();

  if (!isMatch) {
    const nextAttempts = otpRecord.attempts + 1;

    if (isDatabaseConfigured()) {
      try {
        await query(
          `UPDATE otps SET attempts = $1 WHERE id = $2`,
          [nextAttempts, otpRecord.id]
        );
      } catch (err) {
        console.error("[NeonDB Error - incrementOtpAttempts]", err);
      }
    }
    otpRecord.attempts = nextAttempts;

    const remaining = 5 - nextAttempts;
    return {
      valid: false,
      error:
        remaining > 0
          ? `Incorrect code. ${remaining} attempt${remaining > 1 ? "s" : ""} remaining.`
          : "Too many incorrect attempts. This code has been invalidated.",
    };
  }

  // Correct code -> Delete OTP (prevent replay attack)
  await deleteOtp(normalizedEmail, data.purpose);

  return {
    valid: true,
    pendingPayload: otpRecord.pending_payload,
  };
}

export async function deleteOtp(email: string, purpose: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isDatabaseConfigured()) {
    try {
      await query(`DELETE FROM otps WHERE LOWER(email) = $1 AND purpose = $2`, [
        normalizedEmail,
        purpose,
      ]);
    } catch (err) {
      console.error("[NeonDB Error - deleteOtp]", err);
    }
  }

  devOtpsStore.delete(`${normalizedEmail}:${purpose}`);
}

// -----------------------------------------------------------------------------
// AUDIT LOG
// -----------------------------------------------------------------------------
export async function writeAuditLog(data: {
  userId?: string;
  email?: string;
  eventType: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
}): Promise<void> {
  if (isDatabaseConfigured()) {
    try {
      await query(
        `INSERT INTO audit_logs (user_id, email, event_type, ip_address, user_agent, metadata)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.userId || null,
          data.email || null,
          data.eventType,
          data.ipAddress || null,
          data.userAgent || null,
          data.metadata ? JSON.stringify(data.metadata) : null,
        ]
      );
    } catch (err) {
      console.error("[NeonDB Error - writeAuditLog]", err);
    }
  }
}

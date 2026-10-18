import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db/neon";

const SESSION_COOKIE_NAME = "oncue_session";

function getJwtSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    "oncue_default_enterprise_session_key_32_chars_minimum_dev";
  return new TextEncoder().encode(secret);
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Retrieve authenticated contractor session from Next.js request cookies.
 * Validates the JWT and cross-references the user record in Neon database.
 * If running locally in development without an active cookie, falls back to the active contractor.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      const secret = getJwtSecret();
      const { payload } = await jwtVerify(token, secret);
      const userPayload = (payload.user as any) || payload;
      const userId = userPayload.id || userPayload.userId;

      if (userId) {
        // Verify user exists in Neon to prevent foreign key errors
        const userRes = await query<SessionUser>(
          `SELECT id, email, name, role FROM users WHERE id = $1 LIMIT 1`,
          [String(userId)]
        );

        if (userRes.rows.length > 0) {
          return userRes.rows[0];
        }
      }
    }
  } catch {
    // Session token invalid or expired
  }

  // Development Fallback: In non-production, fallback to active contractor in Neon
  if (process.env.NODE_ENV !== "production") {
    try {
      const fallbackRes = await query<SessionUser>(
        `SELECT id, email, name, role FROM users ORDER BY created_at ASC LIMIT 1`
      );
      if (fallbackRes.rows.length > 0) {
        return fallbackRes.rows[0];
      }
    } catch {
      // Neon connection not ready yet
    }
  }

  return null;
}

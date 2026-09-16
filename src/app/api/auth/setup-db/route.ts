import { NextResponse } from "next/server";
import { query, isDatabaseConfigured } from "@/lib/db/neon";

export async function GET() {
  return handleSetup();
}

export async function POST() {
  return handleSetup();
}

async function handleSetup() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "NeonDB DATABASE_URL is not configured yet. Please add your connection string to .env.local",
      },
      { status: 400 }
    );
  }

  try {
    // 1. Enable pgcrypto
    await query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // 2. Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255),
        auth_provider VARCHAR(50) NOT NULL DEFAULT 'email',
        avatar_url TEXT,
        company_name VARCHAR(255),
        role VARCHAR(50) NOT NULL DEFAULT 'contractor',
        is_verified BOOLEAN NOT NULL DEFAULT FALSE,
        failed_attempts INTEGER NOT NULL DEFAULT 0,
        locked_until TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_users_email_lower ON users (LOWER(email));
      CREATE INDEX IF NOT EXISTS idx_users_provider ON users (auth_provider);
    `);

    // 3. OTP table
    await query(`
      CREATE TABLE IF NOT EXISTS otps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL,
        otp_hash VARCHAR(64) NOT NULL,
        purpose VARCHAR(50) NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        pending_payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_otps_email_purpose ON otps (email, purpose);
      CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps (expires_at);
    `);

    // 4. Audit logs table
    await query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        email VARCHAR(255),
        event_type VARCHAR(100) NOT NULL,
        ip_address VARCHAR(100),
        user_agent TEXT,
        metadata JSONB,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs (user_id);
      CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at DESC);
    `);

    return NextResponse.json({
      success: true,
      message:
        "NeonDB database tables (users, otps, audit_logs) and indexes created successfully!",
    });
  } catch (error: any) {
    console.error("Failed to run schema migration on NeonDB:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to initialize tables in NeonDB",
      },
      { status: 500 }
    );
  }
}

-- =============================================================================
-- ONcue Production Authentication & Security Database Schema (NeonDB Postgres)
-- =============================================================================

-- Enable pgcrypto extension for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),               -- Nullable for Google OAuth accounts
    auth_provider VARCHAR(50) NOT NULL DEFAULT 'email', -- 'email' | 'google'
    avatar_url TEXT,
    company_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'contractor', -- 'contractor' | 'admin' | 'team_member'
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    failed_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,     -- Temporary lockout timestamp for brute force defense
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Index for fast user lookup by email (case-insensitive indexing)
CREATE INDEX IF NOT EXISTS idx_users_email_lower ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_provider ON users (auth_provider);

-- 2. OTP Verifications Table (Zero-knowledge: codes are SHA-256 hashed)
CREATE TABLE IF NOT EXISTS otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    otp_hash VARCHAR(64) NOT NULL,             -- SHA-256 hash of the 6-digit OTP
    purpose VARCHAR(50) NOT NULL,              -- 'register' | 'login' | 'reset_password'
    attempts INTEGER NOT NULL DEFAULT 0,       -- Maximum 5 attempts before burn
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL, -- 10 minute expiry window
    pending_payload JSONB,                     -- Hashed password and profile payload stored securely until OTP verification
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indexes for lightning fast OTP lookup and automated cleanup
CREATE INDEX IF NOT EXISTS idx_otps_email_purpose ON otps (email, purpose);
CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps (expires_at);

-- 3. Security Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(255),
    event_type VARCHAR(100) NOT NULL,          -- 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'OTP_SENT', 'OTP_VERIFIED', 'ACCOUNT_LOCKED', 'GOOGLE_LOGIN'
    ip_address VARCHAR(100),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs (created_at DESC);

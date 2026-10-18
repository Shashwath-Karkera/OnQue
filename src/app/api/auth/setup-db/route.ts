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

    // 3. OTP table (stores plain 6-digit OTP in `otp` column)
    await query(`
      CREATE TABLE IF NOT EXISTS otps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(20),
        otp_hash VARCHAR(64),
        purpose VARCHAR(50) NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        pending_payload JSONB,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);

    // Ensure otp column exists on existing tables and otp_hash is optional
    await query(`ALTER TABLE otps ADD COLUMN IF NOT EXISTS otp VARCHAR(20);`);
    await query(`ALTER TABLE otps ALTER COLUMN otp_hash DROP NOT NULL;`);

    await query(`
      CREATE INDEX IF NOT EXISTS idx_otps_email_purpose ON otps (email, purpose);
      CREATE INDEX IF NOT EXISTS idx_otps_expires_at ON otps (expires_at);
    `);

    // 4. Clients table
    await query(`
      CREATE TABLE IF NOT EXISTS clients (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contractor_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        trade_type VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255),
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        score INTEGER NOT NULL DEFAULT 80,
        risk_band VARCHAR(50) NOT NULL DEFAULT 'Low Risk',
        on_time_rate NUMERIC(5,2) DEFAULT 100.00,
        avg_delay_days NUMERIC(5,1) DEFAULT 0.0,
        total_volume_cad NUMERIC(12,2) DEFAULT 0.00,
        outstanding_cad NUMERIC(12,2) DEFAULT 0.00,
        recommended_deposit_pct INTEGER DEFAULT 20,
        recommended_terms VARCHAR(255) DEFAULT 'Net 15 Days',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_clients_contractor ON clients(contractor_id);
    `);

    // 5. Projects table
    await query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contractor_id UUID REFERENCES users(id) ON DELETE CASCADE,
        client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        contract_value_cad NUMERIC(12,2) NOT NULL DEFAULT 0.00,
        paid_cad NUMERIC(12,2) NOT NULL DEFAULT 0.00,
        retainage_pct INTEGER NOT NULL DEFAULT 10,
        start_date DATE NOT NULL,
        target_end_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'In Progress',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_projects_contractor ON projects(contractor_id);
      CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
    `);

    // 6. Project Milestones table
    await query(`
      CREATE TABLE IF NOT EXISTS project_milestones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        percentage INTEGER NOT NULL,
        amount_cad NUMERIC(12,2) NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Upcoming',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id);
    `);

    // 7. Invoices table
    await query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        invoice_number VARCHAR(50) NOT NULL,
        contractor_id UUID REFERENCES users(id) ON DELETE CASCADE,
        client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
        milestone_id UUID REFERENCES project_milestones(id) ON DELETE SET NULL,
        amount_cad NUMERIC(12,2) NOT NULL,
        issued_date DATE NOT NULL,
        due_date DATE NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Pending',
        delay_days INTEGER DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_invoices_contractor ON invoices(contractor_id);
      CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
      CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
    `);

    // 8. Payments table
    await query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        contractor_id UUID REFERENCES users(id) ON DELETE CASCADE,
        invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
        client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
        amount_cad NUMERIC(12,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        settlement_status VARCHAR(50) NOT NULL DEFAULT 'Settled',
        transaction_ref VARCHAR(100),
        settled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_payments_contractor ON payments(contractor_id);
      CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);
    `);

    // 9. Notifications table
    await query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        category VARCHAR(50) NOT NULL,
        headline VARCHAR(255) NOT NULL,
        detail TEXT NOT NULL,
        link VARCHAR(255) NOT NULL,
        unread BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, unread);
    `);

    // 10. Support Tickets table
    await query(`
      CREATE TABLE IF NOT EXISTS support_tickets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        ticket_code VARCHAR(50) NOT NULL UNIQUE,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        category VARCHAR(100) NOT NULL,
        priority VARCHAR(50) NOT NULL DEFAULT 'Normal',
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Open',
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_support_tickets_user ON support_tickets(user_id);
    `);

    // 11. Audit logs table
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
        "All 10 NeonDB database tables and indexes initialized successfully!",
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

import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { query } from "@/lib/db/neon";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const res = await query(
      `SELECT id, name, email, company_name, trade_specialty, phone,
              COALESCE(default_payment_terms, 'Net 15 Days') as default_payment_terms,
              COALESCE(default_deposit_pct, 20) as default_deposit_pct,
              COALESCE(alert_overdue_invoices, true) as alert_overdue_invoices,
              COALESCE(alert_score_drop, true) as alert_score_drop,
              COALESCE(alert_weekly_summary, true) as alert_weekly_summary
       FROM users WHERE id = $1 LIMIT 1`,
      [session.id]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, settings: res.rows[0] });
  } catch (error: any) {
    console.error("[GET /api/settings Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      company_name,
      trade_specialty,
      phone,
      default_payment_terms,
      default_deposit_pct,
      alert_overdue_invoices,
      alert_score_drop,
      alert_weekly_summary,
    } = body;

    const res = await query(
      `UPDATE users
       SET name = COALESCE($2, name),
           company_name = COALESCE($3, company_name),
           trade_specialty = COALESCE($4, trade_specialty),
           phone = COALESCE($5, phone),
           default_payment_terms = COALESCE($6, default_payment_terms),
           default_deposit_pct = COALESCE($7, default_deposit_pct),
           alert_overdue_invoices = COALESCE($8, alert_overdue_invoices),
           alert_score_drop = COALESCE($9, alert_score_drop),
           alert_weekly_summary = COALESCE($10, alert_weekly_summary),
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, name, email, company_name, trade_specialty, phone,
                 default_payment_terms, default_deposit_pct,
                 alert_overdue_invoices, alert_score_drop, alert_weekly_summary`,
      [
        session.id,
        name || null,
        company_name || null,
        trade_specialty || null,
        phone || null,
        default_payment_terms || null,
        default_deposit_pct ? parseInt(default_deposit_pct, 10) : null,
        alert_overdue_invoices !== undefined ? alert_overdue_invoices : null,
        alert_score_drop !== undefined ? alert_score_drop : null,
        alert_weekly_summary !== undefined ? alert_weekly_summary : null,
      ]
    );

    return NextResponse.json({ success: true, settings: res.rows[0] });
  } catch (error: any) {
    console.error("[PUT /api/settings Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { query } from "@/lib/db/neon";

export interface MonthlyVelocity {
  month: string;
  days: number;
  val: number;
  count: number;
}

export interface RiskDistribution {
  tier: "Low Risk" | "Medium Risk" | "High Risk";
  clientsCount: number;
  invoicesCount: number;
  onTimeRate: number;
  outstandingCAD: number;
}

export interface DashboardMetrics {
  totalInvoiced: number;
  totalRevenueSettled: number;
  totalOutstanding: number;
  activeClientsCount: number;
  overdueInvoicesCount: number;
  averageDelayDays: number;
  recentPayments: any[];
  attentionCards: any[];
  velocityTrend: MonthlyVelocity[];
  riskDistribution: RiskDistribution[];
}

export async function getDashboardMetrics(contractorId: string): Promise<DashboardMetrics> {
  // 1. Revenue, Outstanding, & Invoiced Totals from Neon
  const totalsRes = await query(
    `SELECT
       COALESCE(SUM(amount_cad), 0) as total_invoiced,
       COALESCE(SUM(CASE WHEN status = 'Paid' THEN amount_cad ELSE 0 END), 0) as settled,
       COALESCE(SUM(CASE WHEN status != 'Paid' THEN amount_cad ELSE 0 END), 0) as outstanding,
       COUNT(CASE WHEN status = 'Overdue' THEN 1 END)::int as overdue_count
     FROM invoices
     WHERE contractor_id = $1`,
    [contractorId]
  );

  const totalInvoiced = parseFloat(totalsRes.rows[0]?.total_invoiced || 0);
  const settled = parseFloat(totalsRes.rows[0]?.settled || 0);
  const outstanding = parseFloat(totalsRes.rows[0]?.outstanding || 0);
  const overdueCount = parseInt(totalsRes.rows[0]?.overdue_count || 0);

  // 2. Client counts & average delay
  const clientStatsRes = await query(
    `SELECT
       COUNT(*)::int as active_clients,
       COALESCE(AVG(avg_delay_days), 0) as avg_delay
     FROM clients
     WHERE contractor_id = $1`,
    [contractorId]
  );

  const activeClientsCount = parseInt(clientStatsRes.rows[0]?.active_clients || 0);
  const averageDelayDays = parseFloat(Number(clientStatsRes.rows[0]?.avg_delay || 0).toFixed(1));

  // 3. Real Recent Settled Payments
  const recentPaymentsRes = await query(
    `SELECT p.*, i.invoice_number, COALESCE(c.name, 'Direct Client') as client_name, i.due_date
     FROM payments p
     LEFT JOIN invoices i ON p.invoice_id = i.id
     LEFT JOIN clients c ON p.client_id = c.id
     WHERE p.contractor_id = $1
     ORDER BY p.settled_at DESC
     LIMIT 5`,
    [contractorId]
  );

  // 4. Real Attention Cards from Overdue / Late Invoices in Neon
  const attentionRes = await query(
    `SELECT i.*, COALESCE(c.name, 'Direct Client') as client_name
     FROM invoices i
     LEFT JOIN clients c ON i.client_id = c.id
     WHERE i.contractor_id = $1 AND (i.status = 'Overdue' OR i.delay_days > 0)
     ORDER BY i.delay_days DESC, i.due_date ASC
     LIMIT 4`,
    [contractorId]
  );

  const attentionCards = attentionRes.rows.map((row, idx) => ({
    id: idx + 1,
    title: `${row.client_name} - Invoice #${row.invoice_number} is ${row.delay_days > 0 ? row.delay_days + ' days late' : 'action required'}`,
    detail: `$${parseFloat(row.amount_cad).toLocaleString()} outstanding. Verification recommended before releasing next project milestone.`,
    level: row.delay_days > 7 ? "high" : "normal",
    tag: row.delay_days > 7 ? "High Action Required" : "Scheduled Settlement",
    link: "/app/invoices",
  }));

  // 5. Dynamic Monthly Settlement Velocity from Neon
  // Generate the last 6 calendar months dynamically
  const now = new Date();
  const months: { label: string; year: number; monthIndex: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      monthIndex: d.getMonth() + 1,
    });
  }

  const velocityRes = await query(
    `SELECT
       EXTRACT(MONTH FROM p.settled_at)::int as m_idx,
       EXTRACT(YEAR FROM p.settled_at)::int as y_idx,
       COALESCE(AVG(i.delay_days), 0) as avg_delay,
       COUNT(*)::int as count
     FROM payments p
     LEFT JOIN invoices i ON p.invoice_id = i.id
     WHERE p.contractor_id = $1
     GROUP BY m_idx, y_idx`,
    [contractorId]
  );

  const velocityMap = new Map<string, { days: number; count: number }>();
  for (const row of velocityRes.rows) {
    const key = `${row.y_idx}-${row.m_idx}`;
    velocityMap.set(key, {
      days: parseFloat(Number(row.avg_delay || 0).toFixed(1)),
      count: parseInt(row.count || 0),
    });
  }

  const velocityTrend: MonthlyVelocity[] = months.map((m) => {
    const key = `${m.year}-${m.monthIndex}`;
    const data = velocityMap.get(key);
    const days = data ? data.days : 0;
    const count = data ? data.count : 0;
    // Normalized height percentage for chart display (capped at 100)
    const val = days > 0 ? Math.min(100, Math.max(15, Math.round(days * 8))) : 0;
    return {
      month: m.label,
      days,
      val,
      count,
    };
  });

  // 6. Real Client Risk Distribution from Neon
  const riskRes = await query(
    `SELECT
       c.risk_band,
       COUNT(DISTINCT c.id)::int as clients_count,
       COALESCE(COUNT(i.id), 0)::int as invoices_count,
       COALESCE(AVG(c.on_time_rate), 100) as avg_on_time,
       COALESCE(SUM(c.outstanding_cad), 0) as outstanding_cad
     FROM clients c
     LEFT JOIN invoices i ON i.client_id = c.id
     WHERE c.contractor_id = $1
     GROUP BY c.risk_band`,
    [contractorId]
  );

  const riskTiers: ("Low Risk" | "Medium Risk" | "High Risk")[] = [
    "Low Risk",
    "Medium Risk",
    "High Risk",
  ];

  const riskDistribution: RiskDistribution[] = riskTiers.map((tier) => {
    const match = riskRes.rows.find(
      (r) => r.risk_band?.toLowerCase() === tier.toLowerCase()
    );
    return {
      tier,
      clientsCount: match ? parseInt(match.clients_count || 0) : 0,
      invoicesCount: match ? parseInt(match.invoices_count || 0) : 0,
      onTimeRate: match ? parseFloat(Number(match.avg_on_time || 0).toFixed(1)) : (tier === "Low Risk" ? 100 : 0),
      outstandingCAD: match ? parseFloat(match.outstanding_cad || 0) : 0,
    };
  });

  return {
    totalInvoiced,
    totalRevenueSettled: settled,
    totalOutstanding: outstanding,
    activeClientsCount,
    overdueInvoicesCount: overdueCount,
    averageDelayDays,
    recentPayments: recentPaymentsRes.rows,
    attentionCards,
    velocityTrend,
    riskDistribution,
  };
}

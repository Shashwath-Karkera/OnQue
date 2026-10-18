import { query } from "@/lib/db/neon";
import { computeClientReliability } from "@/lib/scoring/reliability";

export interface ClientEntity {
  id: string;
  contractor_id: string;
  name: string;
  trade_type: string;
  location: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  score: number;
  risk_band: "Low Risk" | "Medium Risk" | "High Risk";
  on_time_rate: number;
  avg_delay_days: number;
  total_volume_cad: number;
  outstanding_cad: number;
  recommended_deposit_pct: number;
  recommended_terms: string;
  notes: string | null;
  projects_count?: number;
  invoices_count?: number;
  created_at: string;
  updated_at: string;
}

export async function getClients(
  contractorId: string,
  options?: { search?: string; risk?: string }
): Promise<ClientEntity[]> {
  let sql = `
    SELECT c.*,
      COALESCE((SELECT COUNT(*) FROM projects p WHERE p.client_id = c.id), 0)::int as projects_count,
      COALESCE((SELECT COUNT(*) FROM invoices i WHERE i.client_id = c.id), 0)::int as invoices_count
    FROM clients c
    WHERE c.contractor_id = $1
  `;
  const params: any[] = [contractorId];

  if (options?.search && options.search.trim()) {
    params.push(`%${options.search.trim().toLowerCase()}%`);
    sql += ` AND (LOWER(c.name) LIKE $${params.length} OR LOWER(c.trade_type) LIKE $${params.length} OR LOWER(c.location) LIKE $${params.length})`;
  }

  if (options?.risk && options.risk !== "all") {
    params.push(options.risk);
    sql += ` AND c.risk_band = $${params.length}`;
  }

  sql += ` ORDER BY c.created_at DESC`;

  const res = await query<ClientEntity>(sql, params);
  return res.rows;
}

export async function getClientById(
  contractorId: string,
  clientId: string
): Promise<{ client: ClientEntity; invoices: any[]; projects: any[] } | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clientId);
  let clientRes;
  if (isUuid) {
    clientRes = await query<ClientEntity>(
      `SELECT * FROM clients WHERE id = $1 AND contractor_id = $2 LIMIT 1`,
      [clientId, contractorId]
    );
  } else {
    // Slug or alias match (e.g. 'northstar-renovations' or '1')
    const searchSlug = clientId.toLowerCase().replace(/[^a-z0-9]/g, "%");
    clientRes = await query<ClientEntity>(
      `SELECT * FROM clients 
       WHERE contractor_id = $1 
         AND (LOWER(name) LIKE $2 OR LOWER(trade_type) LIKE $2)
       ORDER BY created_at ASC
       LIMIT 1`,
      [contractorId, `%${searchSlug}%`]
    );
  }

  if (clientRes.rows.length === 0) {
    return null;
  }

  const client = clientRes.rows[0];

  const invoicesRes = await query(
    `SELECT i.*, p.title as project_title
     FROM invoices i
     LEFT JOIN projects p ON i.project_id = p.id
     WHERE i.client_id = $1 AND i.contractor_id = $2
     ORDER BY i.issued_date DESC`,
    [client.id, contractorId]
  );

  const projectsRes = await query(
    `SELECT * FROM projects WHERE client_id = $1 AND contractor_id = $2 ORDER BY created_at DESC`,
    [client.id, contractorId]
  );

  return {
    client,
    invoices: invoicesRes.rows,
    projects: projectsRes.rows,
  };
}

export async function createClient(
  contractorId: string,
  data: {
    name: string;
    tradeType: string;
    location: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    notes?: string;
  }
): Promise<ClientEntity> {
  const res = await query<ClientEntity>(
    `INSERT INTO clients (
      contractor_id, name, trade_type, location, contact_name, contact_email, contact_phone,
      score, risk_band, on_time_rate, avg_delay_days, total_volume_cad, outstanding_cad,
      recommended_deposit_pct, recommended_terms, notes
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      80, 'Low Risk', 100.00, 0.0, 0.00, 0.00,
      20, 'Net 15 Days', $8
    ) RETURNING *`,
    [
      contractorId,
      data.name.trim(),
      data.tradeType.trim(),
      data.location.trim(),
      data.contactName?.trim() || null,
      data.contactEmail?.trim() || null,
      data.contactPhone?.trim() || null,
      data.notes?.trim() || null,
    ]
  );

  return res.rows[0];
}

export async function updateClientScore(
  contractorId: string,
  clientId: string
): Promise<void> {
  const invoicesRes = await query(
    `SELECT status, delay_days, amount_cad FROM invoices WHERE client_id = $1 AND contractor_id = $2`,
    [clientId, contractorId]
  );

  const calculated = computeClientReliability(invoicesRes.rows);

  const volumeRes = await query(
    `SELECT 
       COALESCE(SUM(amount_cad), 0) as total_vol,
       COALESCE(SUM(CASE WHEN status != 'Paid' THEN amount_cad ELSE 0 END), 0) as outstanding
     FROM invoices 
     WHERE client_id = $1 AND contractor_id = $2`,
    [clientId, contractorId]
  );

  const totalVol = volumeRes.rows[0]?.total_vol || 0;
  const outstanding = volumeRes.rows[0]?.outstanding || 0;

  await query(
    `UPDATE clients SET
      score = $1,
      risk_band = $2,
      on_time_rate = $3,
      avg_delay_days = $4,
      recommended_deposit_pct = $5,
      recommended_terms = $6,
      total_volume_cad = $7,
      outstanding_cad = $8,
      updated_at = NOW()
     WHERE id = $9 AND contractor_id = $10`,
    [
      calculated.score,
      calculated.riskBand,
      calculated.onTimeRate,
      calculated.avgDelayDays,
      calculated.recommendedDepositPct,
      calculated.recommendedTerms,
      totalVol,
      outstanding,
      clientId,
      contractorId,
    ]
  );
}

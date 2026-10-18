import { query } from "@/lib/db/neon";
import { updateClientScore } from "@/lib/dal/clients";

export interface InvoiceEntity {
  id: string;
  invoice_number: string;
  contractor_id: string;
  client_id: string;
  client_name?: string;
  project_id: string | null;
  project_title?: string | null;
  amount_cad: number;
  issued_date: string;
  due_date: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  delay_days: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export async function getInvoices(
  contractorId: string,
  filters?: { status?: string; clientId?: string }
): Promise<InvoiceEntity[]> {
  let sql = `
    SELECT i.*, COALESCE(c.name, 'Direct Client') as client_name, p.title as project_title
    FROM invoices i
    LEFT JOIN clients c ON i.client_id = c.id
    LEFT JOIN projects p ON i.project_id = p.id
    WHERE i.contractor_id = $1
  `;
  const params: any[] = [contractorId];

  if (filters?.status && filters.status !== "all") {
    params.push(filters.status);
    sql += ` AND LOWER(i.status) = LOWER($${params.length})`;
  }

  if (filters?.clientId) {
    params.push(filters.clientId);
    sql += ` AND i.client_id = $${params.length}`;
  }

  sql += ` ORDER BY i.issued_date DESC`;

  const res = await query<InvoiceEntity>(sql, params);
  return res.rows;
}

export async function createInvoice(
  contractorId: string,
  data: {
    clientId: string;
    projectId?: string;
    amountCAD: number;
    dueDate: string;
    issuedDate?: string;
    notes?: string;
  }
): Promise<InvoiceEntity> {
  // Generate next sequential invoice code
  const countRes = await query(
    `SELECT COUNT(*) FROM invoices WHERE contractor_id = $1`,
    [contractorId]
  );
  const nextNum = parseInt(countRes.rows[0]?.count || 0) + 1;
  const invNumber = `INV-2026-${String(nextNum).padStart(3, "0")}`;
  const issuedDate = data.issuedDate || new Date().toISOString().split("T")[0];

  const insertRes = await query<{ id: string }>(
    `INSERT INTO invoices (
      invoice_number, contractor_id, client_id, project_id, amount_cad, issued_date, due_date, status, delay_days, notes
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, 'Pending', 0, $8
    ) RETURNING id`,
    [
      invNumber,
      contractorId,
      data.clientId,
      data.projectId || null,
      data.amountCAD,
      issuedDate,
      data.dueDate,
      data.notes || null,
    ]
  );

  await updateClientScore(contractorId, data.clientId);

  const res = await query<InvoiceEntity>(
    `SELECT i.*, COALESCE(c.name, 'Direct Client') as client_name, p.title as project_title
     FROM invoices i
     LEFT JOIN clients c ON i.client_id = c.id
     LEFT JOIN projects p ON i.project_id = p.id
     WHERE i.id = $1`,
    [insertRes.rows[0].id]
  );

  return res.rows[0];
}

export async function updateInvoiceStatus(
  contractorId: string,
  invoiceId: string,
  status: "Paid" | "Pending" | "Overdue",
  delayDays: number = 0
): Promise<InvoiceEntity | null> {
  const res = await query<InvoiceEntity>(
    `UPDATE invoices SET
       status = $1,
       delay_days = $2,
       updated_at = NOW()
     WHERE id = $3 AND contractor_id = $4
     RETURNING *`,
    [status, delayDays, invoiceId, contractorId]
  );

  if (res.rows.length > 0) {
    await updateClientScore(contractorId, res.rows[0].client_id);
    return res.rows[0];
  }

  return null;
}

export async function getInvoiceById(
  contractorId: string,
  invoiceId: string
): Promise<{ invoice: InvoiceEntity; client: any; project: any } | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(invoiceId);
  let invRes;
  if (isUuid) {
    invRes = await query<InvoiceEntity>(
      `SELECT i.*, COALESCE(c.name, 'Direct Client') as client_name, p.title as project_title
       FROM invoices i
       LEFT JOIN clients c ON i.client_id = c.id
       LEFT JOIN projects p ON i.project_id = p.id
       WHERE i.id = $1 AND i.contractor_id = $2
       LIMIT 1`,
      [invoiceId, contractorId]
    );
  } else {
    // Alias or invoice number search (e.g. 'INV-2026-001')
    invRes = await query<InvoiceEntity>(
      `SELECT i.*, COALESCE(c.name, 'Direct Client') as client_name, p.title as project_title
       FROM invoices i
       LEFT JOIN clients c ON i.client_id = c.id
       LEFT JOIN projects p ON i.project_id = p.id
       WHERE i.contractor_id = $1 AND (LOWER(i.invoice_number) = LOWER($2) OR i.id::text = $2)
       LIMIT 1`,
      [contractorId, invoiceId]
    );
  }

  if (invRes.rows.length === 0) return null;

  const invoice = invRes.rows[0];

  let client = null;
  if (invoice.client_id) {
    const cRes = await query(`SELECT * FROM clients WHERE id = $1`, [invoice.client_id]);
    if (cRes.rows.length > 0) client = cRes.rows[0];
  }

  let project = null;
  if (invoice.project_id) {
    const pRes = await query(`SELECT * FROM projects WHERE id = $1`, [invoice.project_id]);
    if (pRes.rows.length > 0) project = pRes.rows[0];
  }

  return {
    invoice,
    client,
    project,
  };
}

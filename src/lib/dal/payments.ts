import { query } from "@/lib/db/neon";
import { updateClientScore } from "@/lib/dal/clients";

export interface PaymentEntity {
  id: string;
  contractor_id: string;
  invoice_id: string;
  invoice_number?: string;
  client_id: string;
  client_name?: string;
  amount_cad: number;
  payment_method: string;
  settlement_status: string;
  transaction_ref: string | null;
  settled_at: string;
  created_at: string;
}

export async function getPayments(
  contractorId: string,
  options?: { limit?: number }
): Promise<PaymentEntity[]> {
  const limit = options?.limit || 50;
  const res = await query<PaymentEntity>(
    `SELECT p.*, i.invoice_number, c.name as client_name
     FROM payments p
     JOIN invoices i ON p.invoice_id = i.id
     JOIN clients c ON p.client_id = c.id
     WHERE p.contractor_id = $1
     ORDER BY p.settled_at DESC
     LIMIT $2`,
    [contractorId, limit]
  );
  return res.rows;
}

export async function recordPayment(
  contractorId: string,
  data: {
    invoiceId: string;
    amountCAD: number;
    paymentMethod: string;
    transactionRef?: string;
    settledAt?: string;
  }
): Promise<PaymentEntity> {
  // 1. Get invoice details
  const invRes = await query(
    `SELECT id, client_id, project_id, due_date FROM invoices WHERE id = $1 AND contractor_id = $2 LIMIT 1`,
    [data.invoiceId, contractorId]
  );

  if (invRes.rows.length === 0) {
    throw new Error("Invoice not found");
  }

  const invoice = invRes.rows[0];
  const settledAt = data.settledAt ? new Date(data.settledAt) : new Date();
  const dueDate = new Date(invoice.due_date);

  // Calculate delay days
  const diffTime = settledAt.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const delayDays = Math.max(0, diffDays);

  // 2. Insert payment record
  const paymentRes = await query<PaymentEntity>(
    `INSERT INTO payments (
       contractor_id, invoice_id, client_id, amount_cad, payment_method, settlement_status, transaction_ref, settled_at
     ) VALUES (
       $1, $2, $3, $4, $5, 'Settled', $6, $7
     ) RETURNING *`,
    [
      contractorId,
      invoice.id,
      invoice.client_id,
      data.amountCAD,
      data.paymentMethod,
      data.transactionRef || `TR-${Math.floor(100000 + Math.random() * 900000)}`,
      settledAt.toISOString(),
    ]
  );

  // 3. Mark invoice as paid with calculated delay days
  await query(
    `UPDATE invoices SET status = 'Paid', delay_days = $1, updated_at = NOW() WHERE id = $2 AND contractor_id = $3`,
    [delayDays, invoice.id, contractorId]
  );

  // 4. Update linked project paid balance if invoice is attached to a project
  if (invoice.project_id) {
    await query(
      `UPDATE projects 
       SET paid_cad = (
         SELECT COALESCE(SUM(amount_cad), 0) 
         FROM invoices 
         WHERE project_id = $1 AND status = 'Paid'
       ),
       updated_at = NOW()
       WHERE id = $1`,
      [invoice.project_id]
    );
  }

  // 5. Update client score in Neon
  await updateClientScore(contractorId, invoice.client_id);

  return paymentRes.rows[0];
}

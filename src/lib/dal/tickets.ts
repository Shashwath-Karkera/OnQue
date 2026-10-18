import { query } from "@/lib/db/neon";

export interface TicketEntity {
  id: string;
  ticket_code: string;
  user_id: string | null;
  name: string;
  email: string;
  company: string | null;
  category: string;
  priority: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export async function createSupportTicket(data: {
  userId?: string | null;
  name: string;
  email: string;
  company?: string;
  category: string;
  priority?: string;
  subject: string;
  message: string;
}): Promise<TicketEntity> {
  const ticketCode = `ONC-${Math.floor(100000 + Math.random() * 900000)}`;

  const res = await query<TicketEntity>(
    `INSERT INTO support_tickets (
       ticket_code, user_id, name, email, company, category, priority, subject, message, status
     ) VALUES (
       $1, $2, $3, $4, $5, $6, $7, $8, $9, 'Open'
     ) RETURNING *`,
    [
      ticketCode,
      data.userId || null,
      data.name.trim(),
      data.email.trim().toLowerCase(),
      data.company?.trim() || null,
      data.category,
      data.priority || "Normal",
      data.subject.trim(),
      data.message.trim(),
    ]
  );

  return res.rows[0];
}

export async function getUserSupportTickets(userId: string): Promise<TicketEntity[]> {
  const res = await query<TicketEntity>(
    `SELECT * FROM support_tickets WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return res.rows;
}


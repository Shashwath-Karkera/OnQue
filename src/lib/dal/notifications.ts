import { query } from "@/lib/db/neon";

export interface NotificationEntity {
  id: string;
  user_id: string;
  category: "Payment overdue" | "Payment received" | "Client risk changed" | "Upcoming due date";
  headline: string;
  detail: string;
  link: string;
  unread: boolean;
  created_at: string;
}

export async function getNotifications(userId: string): Promise<NotificationEntity[]> {
  const res = await query<NotificationEntity>(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return res.rows;
}

export async function markNotificationRead(
  userId: string,
  notificationId: string
): Promise<void> {
  await query(
    `UPDATE notifications SET unread = FALSE WHERE id = $1 AND user_id = $2`,
    [notificationId, userId]
  );
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await query(`UPDATE notifications SET unread = FALSE WHERE user_id = $1`, [userId]);
}

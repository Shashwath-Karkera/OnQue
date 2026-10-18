import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/lib/dal/notifications";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await getNotifications(user.id);
    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    console.error("[GET /api/notifications Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (body.all) {
      await markAllNotificationsRead(user.id);
    } else if (body.id) {
      await markNotificationRead(user.id, body.id);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[PATCH /api/notifications Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

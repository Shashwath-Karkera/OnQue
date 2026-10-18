import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { createSupportTicket, getUserSupportTickets } from "@/lib/dal/tickets";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await getUserSupportTickets(user.id);
    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    console.error("[GET /api/support/ticket Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const body = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    const ticket = await createSupportTicket({
      userId: user?.id || null,
      name: body.name,
      email: body.email,
      company: body.company,
      category: body.category || "General Support",
      priority: body.priority || "Normal",
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json({ success: true, ticket }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/support/ticket Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

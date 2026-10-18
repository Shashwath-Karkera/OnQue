import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getClients, createClient } from "@/lib/dal/clients";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const risk = searchParams.get("risk") || undefined;

    const clients = await getClients(user.id, { search, risk });
    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    console.error("[GET /api/clients Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Client business name is required." },
        { status: 400 }
      );
    }

    const client = await createClient(user.id, {
      name: body.name.trim(),
      tradeType: (body.tradeType && body.tradeType.trim()) || "General Contractor",
      location: (body.location && body.location.trim()) || "Toronto, ON",
      contactName: body.contactName?.trim() || undefined,
      contactEmail: body.contactEmail?.trim() || undefined,
      contactPhone: body.contactPhone?.trim() || undefined,
      notes: body.notes?.trim() || undefined,
    });

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/clients Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

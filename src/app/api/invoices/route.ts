import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getInvoices, createInvoice } from "@/lib/dal/invoices";
import { getClients, createClient } from "@/lib/dal/clients";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const clientId = searchParams.get("clientId") || undefined;

    const invoices = await getInvoices(user.id, { status, clientId });
    return NextResponse.json({ success: true, invoices });
  } catch (error: any) {
    console.error("[GET /api/invoices Error]", error);
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
    const rawAmount = parseFloat(String(body.amountCAD || body.amount || "0").replace(/[^0-9.]/g, ""));
    if (isNaN(rawAmount) || rawAmount <= 0) {
      return NextResponse.json(
        { success: false, error: "A valid positive invoice amount (CAD) is required." },
        { status: 400 }
      );
    }

    // Resolve or auto-create client
    let resolvedClientId = body.clientId;
    if (!resolvedClientId && body.clientName && body.clientName.trim()) {
      const newClient = await createClient(user.id, {
        name: body.clientName.trim(),
        tradeType: body.tradeType || "General Contractor",
        location: body.location || "Toronto, ON",
      });
      resolvedClientId = newClient.id;
    }

    if (!resolvedClientId) {
      const existingClients = await getClients(user.id);
      if (existingClients.length > 0) {
        resolvedClientId = existingClients[0].id;
      } else {
        const defaultClient = await createClient(user.id, {
          name: "Direct Client",
          tradeType: "Commercial Developer",
          location: "Toronto, ON",
        });
        resolvedClientId = defaultClient.id;
      }
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const defaultDueStr = new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split("T")[0];

    const invoice = await createInvoice(user.id, {
      clientId: resolvedClientId,
      projectId: body.projectId || undefined,
      amountCAD: rawAmount,
      dueDate: body.dueDate || defaultDueStr,
      issuedDate: body.issuedDate || todayStr,
      notes: body.notes || undefined,
    });

    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/invoices Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

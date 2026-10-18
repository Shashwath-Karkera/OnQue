import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getInvoiceById } from "@/lib/dal/invoices";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await getInvoiceById(user.id, id);

    if (!data) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error: any) {
    console.error("[GET /api/invoices/[id] Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getClientById } from "@/lib/dal/clients";

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
    const data = await getClientById(user.id, id);

    if (!data) {
      return NextResponse.json({ success: false, error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, ...data });
  } catch (error: any) {
    console.error("[GET /api/clients/[id] Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

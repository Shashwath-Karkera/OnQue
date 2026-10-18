import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getDashboardMetrics } from "@/lib/dal/analytics";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const metrics = await getDashboardMetrics(user.id);
    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    console.error("[GET /api/analytics Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

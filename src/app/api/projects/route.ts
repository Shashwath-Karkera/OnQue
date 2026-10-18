import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/dal/auth";
import { getProjects, createProject } from "@/lib/dal/projects";
import { getClients, createClient } from "@/lib/dal/clients";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const projects = await getProjects(user.id);
    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("[GET /api/projects Error]", error);
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
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, error: "Project title is required." },
        { status: 400 }
      );
    }

    const rawVal = parseFloat(String(body.contractValueCAD || body.contractValue || "0").replace(/[^0-9.]/g, ""));
    if (isNaN(rawVal) || rawVal <= 0) {
      return NextResponse.json(
        { success: false, error: "A valid positive contract value (CAD) is required." },
        { status: 400 }
      );
    }

    // Resolve or Auto-create Client
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
      // Check existing clients
      const existingClients = await getClients(user.id);
      if (existingClients.length > 0) {
        resolvedClientId = existingClients[0].id;
      } else {
        // Auto-initialize a default client for this contractor
        const defaultClient = await createClient(user.id, {
          name: "Direct Client",
          tradeType: "Commercial Developer",
          location: "Toronto, ON",
        });
        resolvedClientId = defaultClient.id;
      }
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const defaultEndStr = new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split("T")[0];

    const project = await createProject(user.id, {
      clientId: resolvedClientId,
      title: body.title.trim(),
      contractValueCAD: rawVal,
      startDate: body.startDate || todayStr,
      targetEndDate: body.targetEndDate || defaultEndStr,
      retainagePct: body.retainagePct !== undefined ? parseInt(body.retainagePct) : 10,
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/projects Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

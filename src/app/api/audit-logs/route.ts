import { NextResponse } from "next/server";
import { getAuditLogs } from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "EDITOR") {
      return NextResponse.json(
        { error: "Forbidden: Editors cannot view security audit logs" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 50;

    const logs = await getAuditLogs(limit);
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Audit logs GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

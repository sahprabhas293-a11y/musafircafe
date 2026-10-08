import { NextResponse } from "next/server";
import { getDestinations, updateDestination } from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Destinations GET error:", error);
    return NextResponse.json({ error: "Failed to load destinations" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Destination ID is required" }, { status: 400 });
    }

    const updated = await updateDestination(id, updates, session.email, session.role);
    if (!updated) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, destination: updated });
  } catch (error) {
    console.error("Destination PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

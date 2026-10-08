import { NextResponse } from "next/server";
import { updateReservationStatus } from "@/lib/services/repository";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { ReservationStatus } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role === "EDITOR") {
      return NextResponse.json(
        { error: "Forbidden: Editors cannot modify reservations" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: ReservationStatus[] = [
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid reservation status" }, { status: 400 });
    }

    const updated = await updateReservationStatus(
      id,
      status,
      session.email,
      session.role
    );

    if (!updated) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Reservation status update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

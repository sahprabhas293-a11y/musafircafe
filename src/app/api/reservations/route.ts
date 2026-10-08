import { NextResponse } from "next/server";
import { createReservation, getReservations } from "@/lib/services/repository";
import { reservationCreateSchema } from "@/lib/validation/schemas";
import { getCurrentAdminSession, checkRateLimit } from "@/lib/auth/session";

// Public table reservation submission
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const rateCheck = checkRateLimit(`res-${ip}`, 5, 10 * 60 * 1000); // 5 per 10 mins

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many reservation attempts from this connection. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = reservationCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid reservation parameters" },
        { status: 400 }
      );
    }

    // Check honeypot field
    if (parsed.data.website) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const { name, phone, email, date, time, guests, notes, occasion } = parsed.data;

    const result = await createReservation({
      name,
      phone,
      email,
      date,
      time,
      guests,
      notes,
      occasion,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Reservation creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process reservation request" },
      { status: 400 }
    );
  }
}

// Protected Admin GET: Only authenticated administrators can view reservations
export async function GET(request: Request) {
  try {
    const session = await getCurrentAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Editors cannot view full reservation list
    if (session.role === "EDITOR") {
      return NextResponse.json(
        { error: "Forbidden: Editors cannot view reservations" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") as any;

    const reservations = await getReservations(statusParam);
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Reservations fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
